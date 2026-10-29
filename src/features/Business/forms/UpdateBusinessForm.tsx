import type { BusinessCategory } from "@prisma/client";
import BusinessForm, { type BusinessWithCategories } from "./BusinessForm";

export default async function UpdateBusinessForm({
  business,
  categories,
}: {
  business: BusinessWithCategories;
  categories: BusinessCategory[];
}) {
  return (
    <BusinessForm mode="edit" business={business} categories={categories} />
  );
}
