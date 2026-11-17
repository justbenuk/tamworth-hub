import { SUPPORTENUITEMS } from "@/data/menus";
import Link from "next/link";

export default function FooterSupportMenu() {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold tracking-wide">Get involved</h2>
      <nav aria-label="Get involved" className="flex flex-col gap-2.5 text-sm">
        {SUPPORTENUITEMS.map((item) => (
          <Link
            href={item.link}
            key={item.link}
            className="w-fit transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
