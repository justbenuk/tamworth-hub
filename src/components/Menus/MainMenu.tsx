"use client";
import { SITEMENUITEMS } from "@/data/menus";
import Link from "next/link";
import PageContainer from "../Page/PageContainer";
import { usePathname } from "next/navigation";
import { cn } from "cn";

export default function MainMenu() {
  const path = usePathname();
  return (
    <PageContainer className="hidden lg:block">
      <nav className="py-4 flex flex-row items-center space-x-8">
        {SITEMENUITEMS.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className={cn(
              "font-semibold text-lg",
              path === item.link &&
                "font-bold text-primary underline underline-offset-22",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </PageContainer>
  );
}
