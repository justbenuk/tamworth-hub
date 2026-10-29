import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FetchBusinessesByCategory,
  FetchCategoryBySlug,
} from "@/features/Business/BusinessActions";
import CategoryIcon from "@/features/Business/components/CategoryIcon";
import { ArrowRightIcon, EyeIcon, ListIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import Image from 'next/image'
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ChildcategoryList from "@/features/Business/components/ChildcategoryList";

type CategoryParams = {
  params: Promise<{ slug: string }>;
};

export default async function DetailCategoryPage({ params }: CategoryParams) {
  const { slug } = await params;
  const category = await FetchCategoryBySlug(slug);
  if (!category) return notFound();
  const businesses = await FetchBusinessesByCategory(category.id)

  return (
    <PageContainer className="py-10">
      <div className="mb-10">
        <span className="uppercase text-primary font-semibold">
          Businesses
        </span>
        <h1>{category.name}</h1>
        <p className="text-lead lg:w-4/5">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {businesses.map((item) => (
              <Card key={item.id}>
                {item.isFeatured && (
                  <Badge className="absolute z-100 text-xl p-4">Featured</Badge>
                )}
                <CardHeader>
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={item.image || "/images/business-placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-row items-center justify-between gap-10">
                  <div>
                    <h3>{item.name}</h3>
                    <div className="flex flex-wrap space-x-2">
                      {item.categories.map((cat) => (
                        <span className="text-primary font-semibold" key={cat.category.id}>{cat.category.name}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="border rounded-full p-2 bg-gray-100">
                      <Link href={`/businesses/${item.slug}`}>
                        <EyeIcon />
                      </Link>
                    </div>
                    {item.phone && (
                      <div className="border rounded-full p-2 bg-gray-100">
                        <a href={`tel:${item.phone.replace(/\s+/g, "")}`} aria-label={`Call ${item.name}`}>
                          <PhoneIcon />
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>


              </Card>
            ))}
          </div>
        </div>
        <aside className="col-span-1">
          <div className="grid gap-6">
            <Card className="bg-red-500/10">
              <CardHeader className="flex flex-row items-center gap-4">
                <CategoryIcon name={category.icon} />
                <CardTitle className="text-xl">
                  Own a {category.name} business
                </CardTitle>
              </CardHeader>
              <CardContent>
                List your business on Tamworth Hub for free and reach more
                local customers
              </CardContent>
              <CardFooter className="flex flex-row items-center justify-end p-2">
                <Link href={'/contact'} className="flex flex-row items-center gap-2 font-semibold text-primary underline">
                  <span>Add your business</span>
                  <ArrowRightIcon className="size-4" />
                </Link>
              </CardFooter>
            </Card>
            <ChildcategoryList parentId={category.id} />
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
