import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FetchFeaturedBusinesses, FetchParentCategories } from "@/features/Business/BusinessActions";
import CategoryIcon from "@/features/Business/components/CategoryIcon";
import { ArrowRightIcon, EyeIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function DirectoryPage() {
  const featured = await FetchFeaturedBusinesses(6)
  const parentcategories = await FetchParentCategories()

  return (
    <PageContainer className="py-10">
      <div className="grid gap-6">
        <div>
          <h1>Business Directory</h1>
          <p className="text-lead">
            Discover local businesses in Tamworth. Support independent and keep
            it local
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6">
          <Input
            className="col-span-1 md:col-span-2 lg:col-span-3 h-full"
            placeholder="Search for a business"
          />
          <Input
            className="col-span-1 md:col-span-2 lg:col-span-2 h-full"
            placeholder="categories"
          />
          <Button size={"lg"} className="flex flex-row gap-2 items-center">
            <span>Search</span>
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between space-y-6">
            <h3>Featured businesses</h3>
            <Link
              href={"/businesses/all"}
              className="flex flex-row items-center gap-2 text-primary"
            >
              <span>View all businesses</span>
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {featured.length > 0 && (
              featured.map((item) => (
                <Card key={item.id}>
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
                  <CardContent className="flex flex-row items-center justify-between">
                    <div>
                      <h3>{item.name}</h3>
                      <div className="flex flex-wrap gap-2">
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
              ))
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between">
            <h3>Browse by category</h3>
            <Link
              href={"/directory/all"}
              className="flex flex-row items-center gap-2 text-primary"
            >
              <span>View all categories</span>
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4">
            {parentcategories.map((cat) => (
              <Link key={cat.id} href={`/businesses/categories/${cat.slug}`}>
                <Card className="min-w-0 justify-center bg-gray-100">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <CategoryIcon name={cat.icon} size={16} />
                    <CardTitle className="min-w-0 wrap-break-word">{cat.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageContainer >
  );
}
