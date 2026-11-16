import EmptyCard from "@/components/Shared/EmptyCard";
import DatabaseIcon from "@/components/Shared/DatabaseIcon";
import BusinessCard from "@/features/Businesses/Components/BusinessCard";
import { FetchBusinessesByCategoryAction } from "@/features/Categories/CategoriesAction";
import ParentCategoryButton from "@/features/Categories/Components/ParentCategoryButton";
import Link from "next/link";
import { Metadata } from "next/dist/types";

type CategoryParams = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Categories",
};

export default async function SingleCategoryView({ params }: CategoryParams) {
  const { slug } = await params;
  const category = await FetchBusinessesByCategoryAction(slug);

  if (!category) {
    return (
      <EmptyCard
        title="Category not found"
        description="Sorry, we couldn’t find the category you’re looking for."
      />
    );
  }

  const businesses = category.businessCategoryAssignments.map(
    ({ business }) => business,
  );
  const featuredBusinesses = businesses.filter(
    (business) => business.isFeatured,
  );
  const otherBusinesses = businesses.filter((business) => !business.isFeatured);

  return (
    <main className="space-y-10 pb-10 md:space-y-14">
      <section className="relative isolate overflow-hidden rounded-2xl border bg-muted/50 px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96"
        />
        <Link
          href="/businesses/categories"
          className="mb-5 inline-flex text-sm font-medium text-primary hover:underline"
        >
          All categories
        </Link>
        <div className="flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary sm:size-16">
            <DatabaseIcon
              name={category.icon ?? undefined}
              className="size-7 sm:size-8"
            />
          </span>
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Browse local businesses
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-4 leading-7 text-muted-foreground sm:text-lg">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {featuredBusinesses.length > 0 && (
            <section
              aria-labelledby="featured-businesses-heading"
              className="space-y-6"
            >
              <div>
                <p className="mb-2 text-sm font-medium text-primary">
                  Handpicked for you
                </p>
                <h2
                  id="featured-businesses-heading"
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Featured in {category.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {featuredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </section>
          )}

          <section
            aria-labelledby="category-businesses-heading"
            className="space-y-6"
          >
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                The local directory
              </p>
              <h2
                id="category-businesses-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {featuredBusinesses.length > 0
                  ? "More businesses"
                  : `Businesses in ${category.name}`}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {businesses.length === 0
                  ? "There are no published businesses in this category yet."
                  : `${otherBusinesses.length} ${otherBusinesses.length === 1 ? "business" : "businesses"} to explore`}
              </p>
            </div>

            {otherBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {otherBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : businesses.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
                <h3 className="text-lg font-semibold">
                  No businesses listed yet
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Check back soon as more local businesses join the directory.
                </p>
              </div>
            ) : null}
          </section>
        </div>

        {category.children.length > 0 && (
          <aside
            aria-labelledby="child-categories-heading"
            className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6"
          >
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                Explore more
              </p>
              <h2
                id="child-categories-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Categories
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {category.children.map((child) => (
                <ParentCategoryButton key={child.id} category={child} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
