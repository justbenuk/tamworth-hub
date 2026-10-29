import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildBusinessCreate,
  businessSlug,
  importFileSchema,
  osmCandidates,
} from "./business-import";

const candidate = {
  approved: true,
  name: "Example & Sons",
  categorySlug: "shopping-retail",
  town: "Tamworth",
  sourceUrl: "https://example.com/business",
};

test("new listings are published but not featured, with weekday defaults and an image", () => {
  const data = buildBusinessCreate(candidate, "retail-id");
  assert.equal(data.image, "/images/business-placeholder.svg");
  assert.equal(data.isPublished, true);
  assert.equal(data.isFeatured, false);
  assert.deepEqual(
    data.openingHours.create.map((hour) => hour.dayOfWeek),
    [1, 2, 3, 4, 5],
  );
  assert.ok(
    data.openingHours.create.every(
      (hour) => hour.openTime === "09:00" && hour.closeTime === "17:00",
    ),
  );
  assert.deepEqual(data.categories.create, [
    { category: { connect: { id: "retail-id" } } },
  ]);
  data.openingHours.create[0].openTime = "10:00";
  assert.equal(
    buildBusinessCreate(candidate, "retail-id").openingHours.create[0].openTime,
    "09:00",
  );
});

test("approval is opt in and invalid source data is rejected", () => {
  const { approved: _, ...unapproved } = candidate;
  void _;
  assert.equal(
    importFileSchema.parse({ source: "Test", businesses: [unapproved] })
      .businesses[0].approved,
    false,
  );
  assert.equal(
    importFileSchema.safeParse({
      source: "Test",
      businesses: [{ ...candidate, website: "javascript:alert(1)" }],
    }).success,
    false,
  );
});

test("slugs match the app and support explicit branch slugs", () => {
  assert.equal(businessSlug(candidate), "example-and-sons");
  assert.equal(
    businessSlug({ ...candidate, slug: "example-town-centre" }),
    "example-town-centre",
  );
  assert.throws(
    () => businessSlug({ ...candidate, name: "!!!" }),
    /Provide a slug/,
  );
});

test("map candidates retain provenance and chains are never auto approved", () => {
  const result = osmCandidates({
    elements: [
      {
        type: "node",
        id: 123,
        tags: {
          name: "Example Cafe",
          amenity: "cafe",
          brand: "Example Chain",
          website: "example.com",
          "addr:city": "Tamworth",
        },
      },
    ],
  });
  assert.equal(result[0].approved, false);
  assert.equal(result[0].categorySlug, "food-drink");
  assert.equal(result[0].sourceUrl, "https://www.openstreetmap.org/node/123");
  assert.equal(result[0].website, "https://example.com");
  assert.match(result[0].reviewNotes!, /May be a chain/);
});

test("incomplete map results are rejected and vacant shops excluded", () => {
  assert.throws(
    () => osmCandidates({ remark: "runtime error: timeout", elements: [] }),
    /incomplete/,
  );
  assert.deepEqual(
    osmCandidates({
      elements: [
        { type: "way", id: 1, tags: { name: "Vacant", shop: "vacant" } },
      ],
    }),
    [],
  );
});
