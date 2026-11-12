import FeaturedBusinessList from "@/features/Businesses/Components/FeaturedBusinessList";
import ParentCategoryList from "@/features/Categories/Components/ParentCategoryList";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function AllBusinessesPage() {
  return (
    <main className="space-y-16 pb-10 md:space-y-20">
      <section className="relative isolate overflow-hidden rounded-2xl border bg-muted/50 px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96"
        />
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Tamworth, made local
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find your next <span className="text-primary">local favourite.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover the independent shops, trusted services and brilliant people
            that make Tamworth special.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/businesses/all"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore all businesses
              <HugeiconsIcon icon={ArrowRight} className="size-4" />
            </Link>
            <Link
              href="/businesses/categories"
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-background/70"
            >
              Browse by category
              <HugeiconsIcon icon={ArrowRight} className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Handpicked for you</p>
            <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
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
            <HugeiconsIcon icon={ArrowRight} className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          <FeaturedBusinessList />
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="space-y-6 rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Find what you need</p>
            <h2 id="categories-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
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
            <HugeiconsIcon icon={ArrowRight} className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          <ParentCategoryList />
        </div>
      </section>
    </main>
  );
}
