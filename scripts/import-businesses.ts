import "dotenv/config";
import { readFile, writeFile, access } from "node:fs/promises";
import { parseArgs } from "node:util";
import { resolve } from "node:path";
import {
  businessSlug,
  buildBusinessCreate,
  defaultBusinessImage,
  importFileSchema,
  osmCandidates,
  overpassSchema,
} from "./lib/business-import";

async function main() {
  const { values } = parseArgs({
    options: {
      file: { type: "string", default: "data/tamworth-businesses.json" },
      discover: { type: "boolean", default: false },
      apply: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
  });
  if (values.help) {
    console.log(`Usage: npm run businesses:import -- [--file path.json] [--discover | --apply]
  --discover  Fetch Tamworth borough candidates from OpenStreetMap; no database writes.
              Use a new --file path for later discoveries; existing files are preserved.
  (default)   Preview approved entries offline; no database connection.
  --apply     Add approved entries as published, unfeatured listings. Existing slugs/names are skipped.
Defaults: Monday–Friday 09:00–17:00, weekends closed, shared placeholder image.`);
    return;
  }
  if (values.discover && values.apply)
    throw new Error("Run discovery and import separately.");
  const file = resolve(values.file);
  if (values.discover) {
    // Tamworth Borough, Staffordshire, UK. Using the boundary avoids the Australian namesake.
    const query = `[out:json][timeout:60];rel(165856);map_to_area->.town;(
      nwr(area.town)["name"]["shop"];
      nwr(area.town)["name"]["craft"];
      nwr(area.town)["name"]["office"];
      nwr(area.town)["name"]["amenity"~"^(restaurant|cafe|fast_food|pub|bar|ice_cream|pharmacy|dentist|doctors|clinic|veterinary)$"];
      nwr(area.town)["name"]["tourism"~"^(hotel|guest_house|motel)$"];
      nwr(area.town)["name"]["leisure"~"^(fitness_centre|sports_centre)$"];
    );out tags;`;
    // Do not overwrite the user's approvals or corrections, including empty files.
    try {
      await access(file);
      throw new Error(`${file} already exists. Use a new --file path.`);
    } catch (error) {
      if (!(
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ))
        throw error;
    }
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: new URLSearchParams({ data: query }),
      headers: { "User-Agent": "TamworthHubBusinessImport/1.0" },
      signal: AbortSignal.timeout(90000),
    });
    if (!response.ok)
      throw new Error(
        `Discovery failed: HTTP ${response.status}. Try again later.`,
      );
    const businesses = osmCandidates(
      overpassSchema.parse(await response.json()),
    );
    if (!businesses.length)
      throw new Error("No candidates returned; nothing was written.");
    await writeFile(
      file,
      JSON.stringify(
        {
          source:
            "© OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright",
          fetchedAt: new Date().toISOString(),
          businesses,
        },
        null,
        2,
      ) + "\n",
      { flag: "wx" },
    );
    console.log(
      `Saved ${businesses.length} candidates to ${file}. These include chains and need review; this is not a complete register.`,
    );
    return;
  }

  const data = importFileSchema.parse(JSON.parse(await readFile(file, "utf8")));
  const approved = data.businesses.filter((business) => business.approved);
  const slugs = new Set<string>();
  for (const business of approved) {
    const slug = businessSlug(business);
    if (slugs.has(slug))
      throw new Error(
        `Duplicate slug '${slug}'. Merge duplicate map entries or set distinct slugs for separate branches.`,
      );
    slugs.add(slug);
  }
  console.log(
    `${data.businesses.length} candidates; ${approved.length} approved; ${data.businesses.length - approved.length} awaiting review.`,
  );
  console.log(
    `Defaults: weekday 09:00–17:00, weekends closed; image ${defaultBusinessImage}; published, not featured.`,
  );
  console.table(
    approved.map((business) => ({
      name: business.name,
      slug: businessSlug(business),
      category: business.categorySlug,
      postcode: business.postcode ?? "",
    })),
  );
  if (!values.apply) {
    console.log(
      "Preview only. To create approved listings, rerun with --apply.",
    );
    return;
  }
  if (!approved.length) {
    console.log("Nothing approved; no database changes.");
    return;
  }
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL is required for --apply.");
  await access(resolve("public", defaultBusinessImage.slice(1)));
  const { db } = await import("../src/lib/db");
  try {
    const categories = await db.businessCategory.findMany({
      select: { id: true, slug: true },
    });
    const categoryIds = new Map(
      categories.map((category) => [category.slug, category.id]),
    );
    const missing = [
      ...new Set(approved.map((business) => business.categorySlug)),
    ].filter((slug) => !categoryIds.has(slug));
    if (missing.length)
      throw new Error(
        `Categories missing: ${missing.join(", ")}. Run your category seed or correct categorySlug before importing.`,
      );
    // One transaction prevents a failed batch from leaving a partial import.
    const result = await db.$transaction(
      async (tx) => {
        let created = 0;
        let skipped = 0;
        for (const business of approved) {
          const slug = businessSlug(business);
          const existing = await tx.business.findFirst({
            where: {
              OR: [
                { slug },
                { name: { equals: business.name, mode: "insensitive" } },
              ],
            },
            select: { id: true },
          });
          if (existing) {
            console.log(
              `SKIP ${business.name} (already exists; edits preserved)`,
            );
            skipped++;
            continue;
          }
          await tx.business.create({
            data: buildBusinessCreate(
              business,
              categoryIds.get(business.categorySlug)!,
            ),
          });
          created++;
        }
        return { created, skipped };
      },
      { timeout: 120000 },
    );
    console.log(
      `Import committed: ${result.created} created, ${result.skipped} skipped. Edit listings in /admin/businesses.`,
    );
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(
    "Import failed:",
    error instanceof Error ? error.message : "Unknown error",
  );
  process.exitCode = 1;
});
