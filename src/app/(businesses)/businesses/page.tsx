import type { Metadata } from 'next';
import PageContainer from "@/components/PageContainer";
import AppPagination from "@/components/Pagination";
import { FetchParentCategories } from "@/features/Business/BusinessActions";
import BusinessCard from "@/features/Business/components/BusinessCard";
import CategoryCard from "@/features/Business/components/CategoryCard";
import { SearchForm } from "@/features/Search/SearchForm";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = {
  title: 'Tamworth Business Directory',
  description: 'Discover local businesses in Tamworth with Tamworth Hub. Find trusted shops, tradespeople, restaurants and services in your area, all in one place.'
};


const PAGE_SIZE = 6;

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const parentcategories = await FetchParentCategories()
  const params = await searchParams;

  const search = (params.search ?? "").trim();
  const requestedPage = Number(params.page);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const where: Prisma.BusinessWhereInput = {
    isPublished: true,
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          categories: {
            some: {
              category: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        },
      ],
    }),
  };

  const total = await db.business.count({ where });
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(1, totalPages));

  const businesses = await db.business.findMany({
    where,
    include: {
      categories: {
        include: {
          category: true
        }
      }
    },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: [{ name: 'asc' }, { isFeatured: 'asc' }, { id: 'asc' }],
  });

  return (
    <PageContainer className="py-10">
      <div className="grid gap-10">
        <div>
          <SearchForm
            action="/businesses"
            defaultValue={search}
            placeholder="Search businesses..."
          />

          <p className="text-sm text-muted-foreground">
            {total} {total === 1 ? "business" : "businesses"} found
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        <AppPagination
          page={currentPage}
          totalPages={totalPages}
          pathname="/businesses"
          searchParams={{ search }}
        />

        <div>
          <div className="flex flex-row items-center justify-between">
            <h3>Browse by category</h3>
            <Link
              href={"/businesses/categories"}
              className="flex flex-row items-center gap-2 text-primary"
            >
              <span>View all categories</span>
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4">
            {parentcategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>

      </div>
    </PageContainer>
  );
}

