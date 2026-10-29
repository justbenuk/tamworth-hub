import slugify from "slugify";
import { z } from "zod";
import { defaultOpeningHours } from "../../src/features/OpeningHours/OpeningHourSchema";

export const defaultBusinessImage = "/images/business-placeholder.svg";

const httpUrl = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), "Use an http(s) URL");
export const importBusinessSchema = z.object({
  approved: z.boolean().default(false),
  name: z.string().trim().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  categorySlug: z.string().trim().min(1),
  description: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  town: z.string().default("Tamworth"),
  postcode: z.string().optional(),
  phone: z.string().optional(),
  email: z.email().optional(),
  website: httpUrl.optional(),
  sourceUrl: httpUrl,
  reviewNotes: z.string().optional(),
});
export const importFileSchema = z.object({
  source: z.string(),
  fetchedAt: z.iso.datetime().optional(),
  businesses: z.array(importBusinessSchema),
});
export type ImportBusiness = z.infer<typeof importBusinessSchema>;

export function businessSlug(business: ImportBusiness) {
  const slug =
    business.slug ?? slugify(business.name, { lower: true, strict: true });
  if (!slug) throw new Error(`Provide a slug for ${business.name}`);
  return slug;
}

export function buildBusinessCreate(
  business: ImportBusiness,
  categoryId: string,
) {
  const {
    name,
    description,
    addressLine1,
    addressLine2,
    town,
    postcode,
    phone,
    email,
    website,
  } = business;
  return {
    name,
    description,
    addressLine1,
    addressLine2,
    town,
    postcode,
    phone,
    email,
    website,
    slug: businessSlug(business),
    image: defaultBusinessImage,
    isPublished: true,
    isFeatured: false,
    openingHours: {
      create: defaultOpeningHours.map((hours) => ({ ...hours })),
    },
    categories: { create: [{ category: { connect: { id: categoryId } } }] },
  };
}

export const overpassSchema = z.object({
  remark: z.string().optional(),
  elements: z.array(
    z.object({
      type: z.enum(["node", "way", "relation"]),
      id: z.number(),
      tags: z.record(z.string(), z.string()),
    }),
  ),
});

export function suggestedCategory(tags: Record<string, string>) {
  if (tags.craft) return "trades-home-services";
  if (tags.office === "estate_agent" || tags.tourism)
    return "property-accommodation";
  if (tags.office) return "professional-business-services";
  if (["hairdresser", "beauty", "tattoo", "massage"].includes(tags.shop))
    return "beauty-personal-care";
  if (["car", "car_repair", "car_parts", "tyres"].includes(tags.shop))
    return "motoring-transport";
  if (
    ["pet", "pet_grooming"].includes(tags.shop) ||
    tags.amenity === "veterinary"
  )
    return "pets-animals";
  if (
    ["pharmacy", "dentist", "doctors", "clinic"].includes(tags.amenity) ||
    tags.shop === "optician"
  )
    return "health-wellbeing";
  if (
    tags.amenity &&
    ["restaurant", "cafe", "fast_food", "pub", "bar", "ice_cream"].includes(
      tags.amenity,
    )
  )
    return "food-drink";
  if (tags.leisure) return "sport-fitness-leisure";
  return "shopping-retail";
}

export function osmCandidates(
  data: z.infer<typeof overpassSchema>,
): ImportBusiness[] {
  if (data.remark)
    throw new Error(`Overpass returned an incomplete result: ${data.remark}`);
  return data.elements
    .filter(({ tags }) => tags.name && !["vacant", "no"].includes(tags.shop))
    .map(({ type, id, tags }) => {
      const rawWebsite = tags["contact:website"] ?? tags.website;
      const website = rawWebsite
        ? /^https?:\/\//i.test(rawWebsite)
          ? rawWebsite
          : `https://${rawWebsite}`
        : undefined;
      const email = tags["contact:email"] ?? tags.email;
      return importBusinessSchema.parse({
        approved: false,
        name: tags.name,
        categorySlug: suggestedCategory(tags),
        addressLine1:
          [tags["addr:housenumber"], tags["addr:street"]]
            .filter(Boolean)
            .join(" ") || tags["addr:housename"],
        addressLine2: tags["addr:suburb"],
        town: tags["addr:city"] ?? "Tamworth",
        postcode: tags["addr:postcode"],
        phone: tags["contact:phone"] ?? tags.phone,
        email: z.email().safeParse(email).success ? email : undefined,
        website: httpUrl.safeParse(website).success ? website : undefined,
        sourceUrl: `https://www.openstreetmap.org/${type}/${id}`,
        reviewNotes: [
          "Confirm this business is currently trading, small and independent; check category and address.",
          tags.brand ? `Brand: ${tags.brand}. May be a chain.` : "",
          tags.operator ? `Operator: ${tags.operator}.` : "",
          tags.opening_hours
            ? `Mapped hours: ${tags.opening_hours}. Import uses placeholder weekday hours.`
            : "",
        ]
          .filter(Boolean)
          .join(" "),
      });
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
