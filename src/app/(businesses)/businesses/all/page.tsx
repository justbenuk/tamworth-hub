import PageContainer from "@/components/PageContainer";
import AppPagination from "@/components/Pagination";
import { FetchAllPublishedBusinesses } from "@/features/Business/BusinessActions";
import BusinessCard from "@/features/Business/components/BusinessCard";
import { SearchForm } from "@/features/Search/SearchForm";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page } = await searchParams;
  const response = await FetchAllPublishedBusinesses(
    typeof page === "string" ? Number(page) : 1,
  );

  return (
    <PageContainer className="py-10">
      <SearchForm action="/businesses" defaultValue="search" placeholder="Search local businesses" />

      <div className="grid gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {response.businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
        <AppPagination page={response.currentPage} totalPages={response.totalPages} pathname="/businesses/all" />

      </div>
    </PageContainer>
  );
}

