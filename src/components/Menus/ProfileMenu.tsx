"use client";

import { PROFILEMENUITEMS } from "@/data/menus";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileMenu() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Profile navigation"
      className="mb-8 overflow-x-auto rounded-lg border border-border bg-muted/60 p-1"
    >
      <ul className="flex min-w-max items-center gap-1">
        {PROFILEMENUITEMS.map((item) => {
          const isActive = pathname === item.link;

          return (
            <li key={item.name}>
              <Link
                href={item.link}
                aria-current={isActive ? "page" : undefined}
                className={`block rounded-md px-5 py-3 text-base font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
