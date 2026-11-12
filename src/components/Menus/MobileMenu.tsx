"use client";

import { SITEMENUITEMS } from "@/data/menus";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import SiteLogo from "../Shared/SiteLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="outline" size="icon-lg" aria-label="Open site menu"><Menu /></Button>} />
        <SheetContent className="w-[min(22rem,88vw)] gap-0 border-l-0 bg-background p-0 sm:max-w-sm">
          <SheetHeader className="border-b bg-muted/40 p-6">
            <SheetTitle><SiteLogo /></SheetTitle>
            <p className="text-left text-sm text-muted-foreground">Explore Tamworth Hub</p>
          </SheetHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
            {SITEMENUITEMS.map((item) => {
              const active = pathname === item.link || (item.link !== "/" && pathname.startsWith(`${item.link}/`));
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-muted ${active ? "bg-primary/10 text-primary" : "text-foreground"}`}
                >
                  {item.name}
                  <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t p-5 text-sm text-muted-foreground">Your town. Our community.</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
