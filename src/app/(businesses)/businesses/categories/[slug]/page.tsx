import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import {
  FetchAllCategoriesAction,
  FetchCategoryBySlug,
} from "@/features/Business/BusinessActions";
import CategoriesBar from "@/features/Business/components/CategoriesBar";
import CategoryIcon from "@/features/Business/components/CategoryIcon";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";

type CategoryParams = {
  params: Promise<{ slug: string }>;
};

export default async function DetailCategoryPage({ params }: CategoryParams) {
  const { slug } = await params;
  const category = await FetchCategoryBySlug(slug);
  const categories = await FetchAllCategoriesAction();

  if (!category) return notFound();

  return (
    <PageContainer className="py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 lg:border-r">
          <div className="grid gap-6 pr-10">
            <div>
              <span className="uppercase text-primary font-semibold">
                Businesses
              </span>
              <h1>{category.name}</h1>
              <p className="text-lead">{category.description}</p>
            </div>
            <CategoriesBar categories={categories} />
          </div>
        </div>
        <aside className="grid gap-6">
          <div className="bg-red-300/10 p-4">
            <div>
              <div className="flex flex-row items-center gap-6">
                <CategoryIcon name={category.icon} />
                <div className="grid gap-3">
                  <h4 className="text-card-title flex flex-col">
                    Own a {category.name} business
                  </h4>
                  <p className="leading-4">
                    List your business on Tamworth Hub for free and reach more
                    local customers
                  </p>
                  <div className="flex flex-col"></div>
                </div>
              </div>
              <div className="md:w-2/3">
                <Button asChild className="flex flex-row" size={"lg"}>
                  <Link href={"/"}>
                    <span>Add your business</span>
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="h-50">
            <h4>Related categories</h4>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
