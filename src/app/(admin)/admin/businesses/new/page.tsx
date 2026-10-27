import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllCategoriesAction } from "@/features/Business/BusinessActions";
import CategoryMultiSelect from "@/features/Business/components/CategoryMultiSelect";

export default async function NewBusinessPage() {
  const categories = await FetchAllCategoriesAction();
  return (
    <div className="grid gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Create a new Business</CardTitle>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-3">
          <CategoryMultiSelect
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
              parentName: categories.find((parent) => parent.id === category.parentId)?.name,
            }))}
          />
        </div>
        <aside></aside>
      </div>
    </div>
  );
}
