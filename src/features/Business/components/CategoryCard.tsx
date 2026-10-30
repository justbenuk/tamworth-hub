import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryIcon from "./CategoryIcon";
import { BusinessCategory } from "@prisma/client";
import Link from "next/link";

export default function CategoryCard({ category }: { category: BusinessCategory }) {
  return (
    <Link href={`/businesses/categories/${category.slug}`}>
      <Card className="min-w-0 justify-center bg-gray-100">
        <CardHeader className="flex flex-row items-center gap-2">
          <CategoryIcon name={category.icon} size={16} />
          <CardTitle className="min-w-0 wrap-break-word">{category.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

