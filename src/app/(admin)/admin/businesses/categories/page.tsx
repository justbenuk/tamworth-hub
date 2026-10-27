import EmptyCard from "@/components/EmptyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllCategoriesAction } from "@/features/Business/BusinessActions";
import AddCatogeryForm from "@/features/Business/forms/AddCatogeryForm";
import AllCategoriesTable from "@/features/Business/tables/AllCategoriesTable";

export default async function BusinessCategotriesPage() {
  const categories = await FetchAllCategoriesAction();

  if (!categories)
    return (
      <EmptyCard
        title="Categories"
        description="No categories have been added yet"
      >
        <p>Placeholder</p>
      </EmptyCard>
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Business Categories</CardTitle>
        <div>
          <AddCatogeryForm />
        </div>
      </CardHeader>
      <CardContent>
        <AllCategoriesTable categories={categories} />
      </CardContent>
    </Card>
  );
}
