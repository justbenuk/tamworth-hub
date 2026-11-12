import { SUPPORTENUITEMS } from "@/data/menus";
import Link from "next/link";

export default function FooterSupportMenu() {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-2xl border-b border-primary py-2">
        Support
      </h2>
      <nav className="flex flex-col space-y-2">
        {SUPPORTENUITEMS.map((item) => (
          <Link href={item.link} key={item.link}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
