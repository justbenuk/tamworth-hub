import { fetchBusinessBySlug } from "@/actions/category-actions"
import { notFound } from "next/navigation"

export default async function SingleBusinessView({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  const business = await fetchBusinessBySlug(slug)

  if (!business) return notFound()

  return (
    <div>
      <div>
        <h1>{business.name}</h1>
      </div>
      <p>{business.description}</p>
      <p>{business.address}</p>
      <p>{business.phone}</p>
      <p>{business.website}</p>
    </div>
  )
}

