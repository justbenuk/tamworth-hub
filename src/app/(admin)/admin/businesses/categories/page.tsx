import EmptyCard from "@/components/EmptyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllCategoriesAction } from "@/features/Business/BusinessActions";
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
      <CardHeader>
        <CardTitle>Business Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <AllCategoriesTable categories={categories} />
      </CardContent>
    </Card>
  );
}
