import type { Metadata } from "next";
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
import { requireAdmin } from "@/lib/sesstions";
import EmptyCard from "@/components/Shared/EmptyCard";

export const metadata: Metadata = {
  title: "Business Categories",
};

export default async function BussinessCategoriesDashboardPage() {
  await requireAdmin();
  const categories = await FetchAllBusinessCategoriesAction();
  if (!categories) {
    return (
      <EmptyCard
        title="Nothing Found"
        description="Failed to fetch categories, Contact the administrator"
      />
    );
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
        <BusinessCategoryForm mode="add" categories={categories} />
      </CardHeader>
      <CardContent>
        <AllBusinessCategoriesTable categories={categories} />
      </CardContent>
    </Card>
  );
}
