import PageContainer from "@/components/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchAllCategories } from "@/features/categories/CategoryActions";
import { AddCategoryForm } from "@/features/categories/forms/AddCategoryForm";
import AllCategoriesTable from "@/features/categories/tables/AllCategoriesTable";

export const dynamic = "force-dynamic";

export default async function PortalCategoriesPage() {
  const categories = await FetchAllCategories();
  return (
    <PageContainer size="large" className="py-10">
      <div className="grid gap-6">
        <Card className="flex flex-row items-center justify-between">
          <CardHeader className="flex-1">
            <CardTitle>Categories</CardTitle>
            <CardDescription>All categories</CardDescription>
          </CardHeader>
          <CardContent>
            <AddCategoryForm />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AllCategoriesTable categories={categories} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
