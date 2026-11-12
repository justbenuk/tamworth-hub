import { SITEMENUITEMS } from "@/data/menus";
import Link from "next/link";

export default function FooterMenu() {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold tracking-wide text-background">Explore</h2>
      <nav aria-label="Footer navigation" className="flex flex-col gap-2.5 text-sm text-background/65">
        {SITEMENUITEMS.map((item) => (
          <Link href={item.link} key={item.link} className="w-fit transition-colors hover:text-background">
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
