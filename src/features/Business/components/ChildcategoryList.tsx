import { Badge } from "@/components/ui/badge"
import { FetchChildCategorysById } from "../BusinessActions"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListIcon } from "lucide-react"

export default async function ChildcategoryList({ parentId }: { parentId: string }) {
  const categories = await FetchChildCategorysById(parentId)

  return (
    <>
      {categories.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="text-xl">Related Categories</CardTitle>
            <ListIcon />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link key={category.id} href={`/businesses/categories/${category.slug}`}>
                  <Badge>{category.name}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

      )}
    </>

  )
}

