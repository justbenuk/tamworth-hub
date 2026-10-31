

import Link from "next/link";
import {
  Search,
  MapPin,
  LayoutGrid,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Option = {
  label: string;
  value: string;
};

type DirectorySearchProps = {
  action: string;
  placeholder?: string;
  search?: string;
  category?: string;
  location?: string;
  categories?: Option[];
  locations?: Option[];
  popularSearches?: string[];
};

export default function BusinessSearch({
  action,
  placeholder = "Search...",
  search = "",
  category = "",
  location = "",
  categories = [],
  locations = [],
  popularSearches = [],
}: DirectorySearchProps) {
  return (
    <section className="space-y-6">

      {/* Search form */}
      <form
        action={action}
        method="GET"
        className="flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm lg:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            name="search"
            type="search"
            aria-label="Search businesses"
            defaultValue={search}
            placeholder={placeholder}
            className="h-12 border-0 bg-muted/40 pl-10 shadow-none"
          />
        </div>

        {categories.length > 0 && (
          <div className="relative lg:w-56">
            <LayoutGrid className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              name="category"
              aria-label="Business category"
              defaultValue={category}
              className="h-12 w-full appearance-none rounded-md bg-muted/40 pl-10 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All categories</option>

              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {locations.length > 0 && (
          <div className="relative lg:w-48">
            <MapPin className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

            <select
              name="location"
              aria-label="Business location"
              defaultValue={location}
              className="h-12 w-full appearance-none rounded-md bg-muted/40 pl-10 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All locations</option>

              {locations.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          type="submit"
          className="h-12 gap-2 px-8"
        >
          <Search className="size-4" />
          Search
        </Button>
        <Button asChild variant="outline" className="h-12 gap-2 px-6">
          <a href={action}>
            <X className="size-4" aria-hidden="true" />
            Clear
          </a>
        </Button>
      </form>

      {/* Popular searches */}
      {popularSearches.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Popular searches
          </p>

          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link
                  href={`${action}?${new URLSearchParams({
                    search: term,
                  })}`}
                >
                  <Search className="size-3.5" />
                  {term}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

