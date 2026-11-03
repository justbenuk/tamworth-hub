import { SITEMENUITEMS } from "@/data/menus";
import Link from "next/link";

export default function FooterMenu() {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-2xl border-b border-primary py-2">
        Menu
      </h2>
      <nav className="grid grid-cols-2 gap-2">
        {SITEMENUITEMS.map((item) => (
          <Link href={item.link} key={item.link}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
