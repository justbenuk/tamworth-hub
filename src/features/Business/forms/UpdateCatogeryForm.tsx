import { BusinessCategory } from "@prisma/client";
import CategoryForm from "./CategoryForm";

export default function UpdateCatogeryForm({
  category,
  categories,
}: {
  category: BusinessCategory;
  categories: BusinessCategory[];
}) {
  return (
    <CategoryForm mode="edit" categories={categories} category={category} />
  );
}
