import { FetchAllCategoriesAction } from "../BusinessActions";
import CategoryForm from "./CategoryForm";

export default async function AddCatogeryForm() {
  const categories = await FetchAllCategoriesAction();
  return <CategoryForm mode="add" categories={categories} />;
}
