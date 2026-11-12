import DatabaseIcon from "@/components/Shared/DatabaseIcon";
import { Button } from "@/components/ui/button";
import { BusinessCategory } from "@prisma/client";
import Link from "next/link";

export default function ParentCategoryButton({
  category,
}: {
  category: BusinessCategory;
}) {
  return (
    <Button
      nativeButton={false}
      render={<Link href={`/businesses/categories/${category.slug}`} />}
      size={"lg"}
      className={"px-8 py-4"}
    >
      <DatabaseIcon name={category.icon as string} className="size-6" />
      {category.name}
    </Button>
  );
}
