import { FetchBusinessById } from "@/features/Businesses/BusinessActions";
import BusinessForm from "@/features/Businesses/Forms/Businessform";
import { FetchAllBusinessCategoriesAction } from "@/features/Categories/CategoriesAction";
import { requireUser } from "@/lib/sesstions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UpdateBusinessPage({ params }: PageProps) {
  const user = await requireUser();
  const { id } = await params;
  const business = await FetchBusinessById({ id });
  const categories = await FetchAllBusinessCategoriesAction();

  return (
    <BusinessForm
      mode="edit"
      business={business}
      categories={categories}
      user={user}
    />
  );
}
