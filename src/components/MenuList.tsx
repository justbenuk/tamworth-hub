import Link from "next/link";

const MENUITEMS = [
  {
    name: "Directory",
    href: "/directory",
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "Crime",
    href: "/crime",
  },
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Charities",
    href: "/charities",
  },
  {
    name: "Wards",
    href: "/wards",
  },
];

export default function MenuList() {
  return (
    <nav className="flex flex-row items-center justify-center gap-3">
      {MENUITEMS.map((item) => (
        <Link href={item.href} key={item.href} className="hover:text-primary">
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
