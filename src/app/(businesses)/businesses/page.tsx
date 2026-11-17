import type { Metadata } from "next";
import BusinessPageTitle from "@/features/Businesses/Components/BusinessPageTitle";
import FeaturedBusinessList from "@/features/Businesses/Components/FeaturedBusinessList";
import ParentCategoryList from "@/features/Categories/Components/ParentCategoryList";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Business Directory",
  description:
    "Discover the independent shops, trusted services and brilliant people that make Tamworth special.",
};

export default function AllBusinessesPage() {
  return (
    <main className="space-y-16 pb-10 md:space-y-20">
      <BusinessPageTitle />

      <section aria-labelledby="featured-heading" className="space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              Handpicked for you
            </p>
            <h2
              id="featured-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Featured businesses
            </h2>
            <p className="mt-2 text-muted-foreground">
              A few local standouts to get you started.
            </p>
          </div>
          <Link
            href="/businesses/all"
            className="group inline-flex items-center gap-2 rounded-md py-2 font-medium text-primary hover:underline"
          >
            View all businesses
            <HugeiconsIcon
              icon={ArrowRight}
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          <FeaturedBusinessList />
        </div>
      </section>

      <section
        aria-labelledby="categories-heading"
        className="space-y-6 rounded-2xl border bg-card p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              Find what you need
            </p>
            <h2
              id="categories-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Browse categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore local businesses by what you&apos;re looking for.
            </p>
          </div>
          <Link
            href="/businesses/categories"
            className="group inline-flex items-center gap-2 rounded-md py-2 font-medium text-primary hover:underline"
          >
            All categories
            <HugeiconsIcon
              icon={ArrowRight}
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ParentCategoryList />
        </div>
      </section>
    </main>
  );
}
