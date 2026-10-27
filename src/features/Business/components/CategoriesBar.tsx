"use client";

import type { BusinessCategory } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import CategoryIcon from "./CategoryIcon";

const itemClass =
  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors";

export default function CategoriesBar({
  categories,
}: {
  categories: BusinessCategory[];
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLSpanElement>(null);
  const [measuredCount, setVisibleCount] = useState<number | null>(null);
  const visibleCount = measuredCount ?? 0;
  const [isOpen, setIsOpen] = useState(false);
  const active = categories.filter(
    (cat) => cat.parentId === null && cat.isActive === true,
  );

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    const more = moreRef.current;
    if (!container || !measure || !more) return;

    const update = () => {
      const widths = Array.from(
        measure.children,
        (child) => child.getBoundingClientRect().width,
      );
      const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
      const available = container.clientWidth;
      const total =
        Math.max(0, ...widths) * widths.length +
        Math.max(0, widths.length - 1) * gap;

      // Only reserve space for More when the complete list does not fit.
      if (total <= available) {
        setVisibleCount(widths.length);
        return;
      }

      const moreWidth = more.getBoundingClientRect().width;
      let widest = 0;
      let count = 0;
      for (const width of widths) {
        widest = Math.max(widest, width);
        // Every visible category gets the same width as the widest label.
        if (moreWidth + widest * (count + 1) + gap * (count + 1) > available)
          break;
        count++;
      }
      setVisibleCount(count);
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(measure);
    observer.observe(more);
    update();
    return () => observer.disconnect();
  }, [categories]);

  const hiddenCategories = active.slice(visibleCount);
  const isActive = (active: BusinessCategory) =>
    pathname === `/businesses/categories/${active.slug}`;
  const moreIsActive =
    measuredCount !== null && hiddenCategories.some(isActive);

  return (
    <nav
      aria-label="Business categories"
      className="relative min-w-0 rounded-md bg-muted p-1 text-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 top-0 h-0 overflow-hidden"
      >
        <div ref={measureRef} className="flex w-max">
          {active.map((category) => (
            <span
              key={category.id}
              className={`${itemClass} border-transparent`}
            >
              <span className="size-4 shrink-0" />
              {category.name}
            </span>
          ))}
        </div>
        <span ref={moreRef} className={`${itemClass} border-transparent`}>
          More <ChevronDownIcon className="size-4 shrink-0" />
        </span>
      </div>

      <div
        ref={containerRef}
        className="grid min-w-0 items-center gap-1"
        style={{
          gridTemplateColumns: [
            visibleCount > 0 ? `repeat(${visibleCount}, minmax(0, 1fr))` : "",
            hiddenCategories.length > 0 ? "auto" : "",
          ]
            .filter(Boolean)
            .join(" "),
        }}
      >
        {active.slice(0, visibleCount).map((category) => (
          <Link
            key={category.id}
            href={`/businesses/categories/${category.slug}`}
            aria-current={isActive(category) ? "page" : undefined}
            className={`${itemClass} justify-start rounded-sm text-left focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 ${isActive(category) ? "border-primary bg-primary text-primary-foreground" : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}`}
          >
            <CategoryIcon name={category.icon} size={16} />
            {category.name}
          </Link>
        ))}

        {hiddenCategories.length > 0 && (
          <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger
              className={`${itemClass} ml-auto min-w-0 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-ring ${moreIsActive ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90" : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground data-[state=open]:bg-accent"}`}
            >
              More <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={4}
                className="z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground shadow-lg"
              >
                {hiddenCategories.map((category) => (
                  <DropdownMenu.Item key={category.id} asChild>
                    <Link
                      href={`/businesses/categories/${category.slug}`}
                      aria-current={isActive(category) ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm font-medium outline-none ${isActive(category) ? "bg-primary text-primary-foreground data-[highlighted]:bg-primary/90" : "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"}`}
                    >
                      <CategoryIcon name={category.icon} size={16} />
                      {category.name}
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
      </div>
    </nav>
  );
}
