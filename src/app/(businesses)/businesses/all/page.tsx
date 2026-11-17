import type { Metadata } from "next";
import { FetchAllPublishedBusinesses } from "@/features/Businesses/BusinessActions";
import BusinessCard from "@/features/Businesses/Components/BusinessCard";
import { ArrowRight, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: "Find a local business",
};

export default async function AllBusinessesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const cursor = typeof params.cursor === "string" ? params.cursor : undefined;
  const { businesses, nextCurser } = await FetchAllPublishedBusinesses({
    search,
    curser: cursor,
  });

  return (
    <main className="space-y-10 pb-10 md:space-y-14">
      <section className="relative isolate overflow-hidden rounded-2xl border bg-muted/50 px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96"
        />
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Tamworth, made local
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Explore local businesses
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          Find independent shops, trusted services and the people who make our
          community special.
        </p>

        <form
          action="/businesses/all"
          className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="business-search" className="sr-only">
            Search businesses
          </label>
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-md border bg-background px-4 shadow-sm focus-within:ring-2 focus-within:ring-ring">
            <HugeiconsIcon
              icon={Search}
              className="size-5 shrink-0 text-muted-foreground"
            />
            <input
              id="business-search"
              name="search"
              type="search"
              defaultValue={search}
              placeholder="Search businesses or categories"
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="min-h-12 rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </section>

      <section aria-labelledby="business-results-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              The local directory
            </p>
            <h2
              id="business-results-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {search ? `Results for “${search}”` : "All businesses"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {businesses.length === 0
                ? "No businesses found. Try a different search."
                : `${businesses.length}${nextCurser ? "+" : ""} businesses to explore`}
            </p>
          </div>
          {search && (
            <Link
              href="/businesses/all"
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear search
            </Link>
          )}
        </div>

        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
            <h3 className="text-lg font-semibold">No matches yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Try searching for a business name or category, or browse the full
              directory.
            </p>
          </div>
        )}

        {nextCurser && (
          <div className="flex justify-center pt-2">
            <Link
              href={`/businesses/all?${new URLSearchParams({ ...(search ? { search } : {}), cursor: nextCurser })}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border bg-background px-5 font-medium transition-colors hover:bg-muted"
            >
              More businesses
              <HugeiconsIcon icon={ArrowRight} className="size-4" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
