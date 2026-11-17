import { FetchAllBusinessCategoriesAction } from "@/features/Categories/CategoriesAction";
import ParentCategoryButton from "@/features/Categories/Components/ParentCategoryButton";

export default async function CategoriesPage() {
  const categories = await FetchAllBusinessCategoriesAction();

  console.log(categories);
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((cat) => (
        <ParentCategoryButton category={cat} key={cat.id} />
      ))}
    </div>
  );
}
