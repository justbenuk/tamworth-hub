import PageContainer from "@/components/PageContainer";
import { FetchAllCategoriesAction } from "@/features/Business/BusinessActions";
import CategoryCard from "@/features/Business/components/CategoryCard";

export default async function AllCategoriesPage() {
  const categories = await FetchAllCategoriesAction()

  const parent = categories.filter((p) => p.parentId === null)
  const sub = categories.filter((p) => p.parentId !== null)
  return (
    <PageContainer className="py-10">
      <div className="grid gap-10">
        <div>
          <h2>Main Categories</h2>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4">
            {parent.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
        <div>
          <h2>Sub Categories</h2>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4">
            {sub.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>

      </div>
    </PageContainer>
  )
}

