import { Fragment } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  pathname: string;
  searchParams?: Record<string, string>;
};

export default function AppPagination({
  page,
  totalPages,
  pathname,
  searchParams
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter(
    (p) =>
      p === 1 ||
      p === totalPages ||
      Math.abs(p - page) <= 1
  );


  const href = (p: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(p));

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of {totalPages}
      </p>
      <PaginationContent className="gap-1 rounded-xl border bg-card p-1.5 shadow-sm">
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? href(page - 1) : undefined}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
            className={
              page === 1
                ? "pointer-events-none rounded-lg opacity-35"
                : "rounded-lg"
            }
          />
        </PaginationItem>

        {pages.map((p, index) => (
          <Fragment key={p}>
            {index > 0 && p - pages[index - 1] > 1 && (
              <PaginationItem className="hidden sm:block">
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem className={p !== 1 && p !== totalPages && p !== page ? "hidden sm:block" : undefined}>
              <PaginationLink
                href={href(p)}
                isActive={p === page}
                aria-label={`Page ${p}`}
                className="rounded-lg border-transparent tabular-nums data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm data-[active=true]:hover:bg-primary/90"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        ))}

        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? href(page + 1) : undefined}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : undefined}
            className={
              page === totalPages
                ? "pointer-events-none rounded-lg opacity-35"
                : "rounded-lg"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
