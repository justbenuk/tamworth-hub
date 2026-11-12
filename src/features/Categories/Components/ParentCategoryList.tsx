import { FetchBusinessPartentCategoriesAction } from "../CategoriesAction";
import ParentCategoryButton from "./ParentCategoryButton";

export default async function ParentCategoryList() {
  const categories = await FetchBusinessPartentCategoriesAction();
  return (
    <>
      {categories.map((category) => (
        <ParentCategoryButton category={category} key={category.id} />
      ))}
    </>
  );
}
