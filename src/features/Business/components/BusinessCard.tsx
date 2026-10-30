import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { EyeIcon, PhoneIcon } from "lucide-react";
import Image from 'next/image'
import Link from "next/link";

type BusinessProps = Prisma.BusinessGetPayload<{
  include: {
    categories: {
      include: { category: true }
    }
  }
}>

export default function BusinessCard({ business }: { business: BusinessProps }) {
  return (
    <Card>
      {business.isFeatured && (
        <Badge className="absolute z-100 text-lg capitalize p-3">featured</Badge>
      )}
      <CardHeader>
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={business.image || "/images/business-placeholder.svg"}
            alt={business.name}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between">
        <div>
          <h3>{business.name}</h3>
          <div className="flex flex-wrap space-x-2">
            {business.categories.map((cat) => (
              <span className="text-primary font-semibold" key={cat.category.id}>{cat.category.name}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="border rounded-full p-2 bg-gray-100">
            <Link href={`/businesses/${business.slug}`}>
              <EyeIcon />
            </Link>
          </div>
          {business.phone && (
            <div className="border rounded-full p-2 bg-gray-100">
              <a href={`tel:${business.phone.replace(/\s+/g, "")}`} aria-label={`Call ${business.name}`}>
                <PhoneIcon />
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

