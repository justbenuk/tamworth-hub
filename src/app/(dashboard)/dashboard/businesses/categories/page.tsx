import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchAllBusinessCategoriesAction } from "@/features/Categories/CategoriesAction";
import BusinessCategoryForm from "@/features/Categories/Forms/BusinessCategoryForm";
import AllBusinessCategoriesTable from "@/features/Categories/Tables/AllBusinessCategoriesTable";

export default async function BussinessCategoriesDashboardPage() {
  const response = await FetchAllBusinessCategoriesAction();

  if (!response.data) {
    return <div>no data</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex-1">
          <CardTitle className="font-semibold text-xl">
            Business Categories
          </CardTitle>
          <CardDescription>Manage all business categories</CardDescription>
        </div>
        <BusinessCategoryForm mode="add" categories={response.data} />
      </CardHeader>
      <CardContent>
        <AllBusinessCategoriesTable categories={response.data} />
      </CardContent>
    </Card>
  );
}
