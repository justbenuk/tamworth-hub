import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Map, Phone, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type BusinessProps = Prisma.BusinessGetPayload<{
  include: {
    categories: {
      include: {
        category: true;
      };
    };
  };
}>;

export default function BusinessCard({
  business,
}: {
  business: BusinessProps;
}) {
  const isFeatured = business.isFeatured;
  const location = business.addressLine1 || business.town || "Tamworth";

  return (
    <Card
      className={`group relative h-full gap-0 py-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        isFeatured
          ? "border-primary/30 shadow-md shadow-primary/5 ring-primary/20"
          : "hover:ring-foreground/20"
      }`}
    >
      <Link
        href={`/businesses/${business.slug}`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        aria-label={`View ${business.name}`}
      />

      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={business.image || "/images/business-placeholder.svg"}
          alt={business.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/35 to-transparent" />
        {isFeatured && (
          <Badge className="absolute left-3 top-3 z-10 h-7 gap-1.5 border border-white/20 bg-primary px-3 text-primary-foreground shadow-md">
            <HugeiconsIcon icon={Star} className="size-3.5" />
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="relative z-10 gap-3 px-4 pb-3 pt-4 sm:px-5">
        <CardTitle className="flex items-start justify-between gap-3 text-base font-semibold leading-snug sm:text-lg">
          <Link
            href={`/businesses/${business.slug}`}
            className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {business.name}
          </Link>
          <HugeiconsIcon
            icon={ArrowRight}
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
          />
        </CardTitle>
        <CardDescription className="flex min-h-6 flex-wrap gap-1.5">
          {business.categories.length > 0 ? (
            business.categories.slice(0, 3).map((cat) => (
              <span
                key={cat.categoryId}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {cat.category.name}
              </span>
            ))
          ) : (
            <span className="text-xs">Local business</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 mt-auto flex items-center justify-between gap-3 border-t px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <HugeiconsIcon
            icon={Map}
            className="size-4 shrink-0 text-primary/80"
          />
          <span className="truncate">{location}</span>
        </div>
        {business.phone && (
          <Button
            nativeButton={false}
            render={
              <a
                href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
                aria-label={`Call ${business.name}`}
                className="relative z-20"
              />
            }
            variant="secondary"
            size="icon-sm"
            className="shrink-0 rounded-full"
          >
            <HugeiconsIcon icon={Phone} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
