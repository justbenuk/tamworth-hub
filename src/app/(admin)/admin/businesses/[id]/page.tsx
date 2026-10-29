import {
  FetchAllCategoriesAction,
  FetchBusinessById,
} from "@/features/Business/BusinessActions";
import UpdateBusinessForm from "@/features/Business/forms/UpdateBusinessForm";
import { notFound } from "next/navigation";

type BusinessProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBusinessPage({ params }: BusinessProps) {
  const id = await params;

  const business = await FetchBusinessById(id);
  const categories = await FetchAllCategoriesAction();

  if (!business) notFound();
  return <UpdateBusinessForm business={business} categories={categories} />;
}
