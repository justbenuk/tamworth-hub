import { fetchCategoryBySlug, fetchBusinessesByCategory } from "@/actions/category-actions"
import PageContainer from "@/components/shared/PageContainer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params
  const category = await fetchCategoryBySlug(slug)

  if (!category) {
    return (
      <div>nope</div>
    )
  }

  // If this category has children, show subcategories
  if (category.children.length > 0) {
    return (
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {category.children.map((cat) => (
            <Link key={cat.id} href={`/business/category/${cat.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <h3>{cat.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    )
  }

  // Otherwise, show businesses in this category
  const businesses = await fetchBusinessesByCategory(category.id)

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      {businesses.length === 0 ? (
        <p>No businesses found in this category.</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {businesses.map((biz) => (
            <Link key={biz.id} href={`/business/${biz.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <h3>{biz.name}</h3>
                  {biz.description && (
                    <p className="text-sm text-muted-foreground mt-2">{biz.description}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
