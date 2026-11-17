import { Card } from "@/components/ui/card";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function BusinessPageTitle() {
  return (
    <Card className="grid grid-cols-1 lg:grid-cols-2 p-0">
      <div className="px-6 py-12 flex flex-col space-y-6">
        <span className="text-primary uppercase font-semibold">
          Your Town, Our Community
        </span>
        <h1 className="text-5xl lg:text-6xl font-semibold">
          Find your next <span className="text-primary">local favourite.</span>
        </h1>
        <p className="text-gray-500 text-xl">
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
      <div
        className="relative min-h-64 overflow-hidden bg-cover"
        style={{ backgroundImage: 'url("/images/tamworth-castle.jpg")' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-card via-card/90 via-35% to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
        />
      </div>
    </Card>
  );
}
