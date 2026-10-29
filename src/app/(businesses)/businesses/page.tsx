import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function DirectoryPage() {
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
        <div>categories short</div>
        <div>
          <div className="flex flex-row items-center justify-between">
            <h3>Featured businesses</h3>
            <Link
              href={"/directory/all"}
              className="flex flex-row items-center gap-2 text-primary"
            >
              <span>View all businesses</span>
              <ArrowRightIcon className="size-4" />
            </Link>
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
        </div>
      </div>
    </PageContainer>
  );
}
