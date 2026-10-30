"use client";
import Link from "next/link";
import PageContainer from "../PageContainer";
import { usePathname } from "next/navigation";

const MENUITEMS = [
  {
    name: "News",
    link: "/news",
  },
  {
    name: "What's On",
    link: "/events",
  },
  {
    name: "Businesses",
    link: "/businesses",
  },
  {
    name: "Jobs",
    link: "/jobs",
  },
  {
    name: "Charities",
    link: "/charities",
  },
  {
    name: "Community",
    link: "/community",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];
export default function SiteMenu() {
  const path = usePathname();
  return (
    <div className="hidden lg:block border-b py-2">
      <PageContainer>
        <nav className="hidden md:flex flex-row items-center gap-10 lg:text-sm">
          {MENUITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={
                path === item.link
                  ? "text-primary underline underline-offset-10 decoration-3"
                  : "text-nav"
              }
            >
              <h4>{item.name}</h4>
            </Link>
          ))}
        </nav>
      </PageContainer>
    </div>
  );
}
