import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FetchBusinessesByCategory,
  FetchCategoryBySlug,
} from "@/features/Business/BusinessActions";
import CategoryIcon from "@/features/Business/components/CategoryIcon";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChildcategoryList from "@/features/Business/components/ChildcategoryList";
import BusinessCard from "@/features/Business/components/BusinessCard";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((item) => (
              <BusinessCard key={item.id} business={item} />
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
