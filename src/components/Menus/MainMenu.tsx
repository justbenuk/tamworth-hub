"use client";

import { SITEMENUITEMS } from "@/data/menus";
import Link from "next/link";
import PageContainer from "../Page/PageContainer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainMenu() {
  const path = usePathname();
  return (
    <PageContainer className="hidden lg:block">
      <nav aria-label="Main navigation" className="flex items-center gap-1 border-t border-border/60 py-2">
        {SITEMENUITEMS.map((item) => {
          const active = path === item.link || (item.link !== "/" && path.startsWith(`${item.link}/`));
          return (
            <Link
              href={item.link}
              key={item.name}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                active && "bg-primary/10 font-semibold text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </PageContainer>
  );
}
