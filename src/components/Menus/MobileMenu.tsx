"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ChartBarStackedIcon, MenuIcon } from "lucide-react";
import SiteLogo from "../SiteLogo";
import Link from "next/link";
import { cn } from "cn";

const MENUITEMS = [
  {
    name: 'Home',
    link: '/'
  },
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
export default function MobileMenu() {
  const path = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild className="flex flex-row items-center justify-center lg:hidden" >
        <Button variant="ghost" size={'icon-lg'}>
          <MenuIcon className="size-7" />
        </Button>
      </SheetTrigger >
      <SheetContent>
        <SheetHeader className="flex flex-col items-center space-y-2">
          <SheetTitle>
            <SiteLogo />
          </SheetTitle>
          <SheetDescription className="text-tagline text-center">
            Your town, Our community
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-4 p-8">
          {MENUITEMS.map((item) => (
            <Link key={item.name} href={item.link} className={cn('text-xl', path === item.link && 'text-primary font-semibold underline')}>{item.name}</Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet >
  );
}
