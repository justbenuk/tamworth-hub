import Link from "next/link";
import MainNav from "./menus/MainNav";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-4">
      <Link href={'/'}>Tamworth Hub</Link>
      <MainNav />
      <div>contact</div>
    </header>
  )
}

