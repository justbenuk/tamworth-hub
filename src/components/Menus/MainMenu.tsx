import { MAINMENUITEMS } from "@/data/Menus";
import Link from "next/link";

export default function MainMenu() {
  return (
    <nav className="hidden lg:flex flex-row gap-6 items-center">
      {MAINMENUITEMS.map((item) => (
        <Link key={item.link} href={item.link}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
