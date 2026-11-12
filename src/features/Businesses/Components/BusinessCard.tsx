import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Map, Phone } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Prisma } from "@prisma/client";
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
  return (
    <Card className="pt-0">
      {business.isFeatured && (
        <Badge className="absolute z-100">Featured</Badge>
      )}
      <Image
        src={business.image || "/images/business-placeholder.svg"}
        alt="business.image"
        width={400}
        height={400}
        className="aspect-video h-60 w-full"
      />
      <CardHeader>
        <CardTitle>
          <Link
            href={`/businesses/${business.slug}`}
            className="hover:underline flex flex-row items-center justify-between"
          >
            {business.name}
            <HugeiconsIcon icon={ArrowRight} />
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-wrap space-x-2">
          {business.categories.map((cat) => (
            <span key={cat.categoryId} className="text-xs">
              {cat.category.name}
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <HugeiconsIcon icon={Map} className="size-4" />
            <span>{business.addressLine1}</span>
          </div>
          {business.phone && (
            <Button
              nativeButton={false}
              render={
                <a
                  href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
                  aria-label={`Call ${business.name}`}
                />
              }
              variant="secondary"
            >
              <HugeiconsIcon icon={Phone} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
