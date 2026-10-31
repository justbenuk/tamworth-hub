import type { Metadata } from 'next';
import PageContainer from "@/components/PageContainer";
import AppPagination from "@/components/Pagination";
import { FetchAllCategoriesAction } from "@/features/Business/BusinessActions";
import BusinessCard from "@/features/Business/components/BusinessCard";
import CategoryCard from "@/features/Business/components/CategoryCard";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import BusinessSearch from '@/features/Search/BusinessSearchForm';


export const metadata: Metadata = {
  title: 'Tamworth Business Directory',
  description: 'Discover local businesses in Tamworth with Tamworth Hub. Find trusted shops, tradespeople, restaurants and services in your area, all in one place.'
};


const PAGE_SIZE = 6;

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string | string[];
    category?: string | string[];
    location?: string | string[];
    page?: string | string[];
  }>;
}) {
  const [categories, addresses] = await Promise.all([
    FetchAllCategoriesAction(),
    db.business.findMany({
      where: { isPublished: true, addressLine2: { not: null } },
      select: { addressLine2: true },
      distinct: ["addressLine2"],
      orderBy: { addressLine2: "asc" },
    }),
  ]);
  const parentcategories = categories.filter((item) => item.parentId === null);
  const locations = addresses.flatMap(({ addressLine2 }) =>
    addressLine2?.trim() ? [{ label: addressLine2, value: addressLine2 }] : [],
  );
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search.trim() : "";
  const category = typeof params.category === "string" ? params.category : "";
  const location = typeof params.location === "string" ? params.location : "";
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const where: Prisma.BusinessWhereInput = {
    isPublished: true,
    ...(category && {
      categories: { some: { category: { slug: category, isActive: true } } },
    }),
    ...(location && { addressLine2: location }),
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
      <div className="grid gap-6">

        <div className="space-y-3">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">
            Explore Tamworth
          </p>
          <h1>Find local businesses in Tamworth</h1>

          <p className="text-lead">Discover local shops, tradespeople, restaurants and services across Tamworth.</p>
        </div>
        <BusinessSearch
          action="/businesses"
          placeholder="Search businesses..."
          search={search}
          category={category}
          location={location}
          locations={locations}
          categories={categories.map((item) => ({
            label: item.name,
            value: item.slug,
          }))}
          popularSearches={[
            "Plumber",
            "Electrician",
            "Hairdresser",
            "Restaurant",
            "Takeaway",
            "Car Garage",
            "Gardener",
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        <AppPagination
          page={currentPage}
          totalPages={totalPages}
          pathname="/businesses"
          searchParams={{ search, category, location }}
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

