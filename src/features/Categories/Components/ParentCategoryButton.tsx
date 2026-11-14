import DatabaseIcon from "@/components/Shared/DatabaseIcon";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { BusinessCategory } from "@prisma/client";
import Link from "next/link";

export default function ParentCategoryButton({
  category,
}: {
  category: BusinessCategory;
}) {
  return (
    <Link
      href={`/businesses/categories/${category.slug}`}
      className="group flex min-h-24 items-center gap-4 rounded-xl border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <DatabaseIcon name={category.icon ?? undefined} className="size-6" />
      </span>
      <span className="min-w-0 flex-1 text-left text-sm font-semibold leading-snug sm:text-base">
        {category.name}
      </span>
      <HugeiconsIcon
        icon={ArrowRight}
        className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
      />
    </Link>
  );
}
