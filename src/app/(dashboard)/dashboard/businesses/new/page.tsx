import BusinessForm from "@/features/Businesses/Forms/Businessform";
import { FetchAllBusinessCategoriesAction } from "@/features/Categories/CategoriesAction";
import { requireAdmin } from "@/lib/sesstions";

export default async function NewBusinessPage() {
  const user = await requireAdmin();
  const categories = await FetchAllBusinessCategoriesAction();

  return <BusinessForm mode="add" categories={categories} user={user} />;
}
