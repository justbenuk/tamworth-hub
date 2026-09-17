import { Category } from "@prisma/client";
import CategoryForm from "./CategoryForm";

export default function EditCategoryForm({ category }: { category: Category }) {
  return <CategoryForm mode="edit" category={category} />;
}
