import { FetchAllCategoriesAction } from "../BusinessActions";
import BusinessForm from "./BusinessForm";

export default async function AddBusinessForm() {
  const categories = await FetchAllCategoriesAction();

  return <BusinessForm mode="add" categories={categories} />;
}
