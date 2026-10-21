import Link from "next/link";

const MENUITEMS = [
  {
    name: "News",
    link: "/news",
  },
  {
    name: "Jobs",
    link: "/jobs",
  },
  {
    name: "Events",
    link: "/Events",
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
  return (
    <nav className="hidden md:flex flex-row items-center gap-3 lg:text-sm">
      {MENUITEMS.map((item) => (
        <Link key={item.name} href={item.link}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
