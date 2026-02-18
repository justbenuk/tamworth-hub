import { fetchParentCategories } from "@/actions/category-actions"
import PageContainer from "@/components/shared/PageContainer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function BusinessPage() {

  const categories = await fetchParentCategories()

  if (!categories) {
    return (
      <div>nope</div>
    )
  }
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Browse Businesses</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/business/category/${cat.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-cneter p-6 text-center">
                <h3>{cat.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}

