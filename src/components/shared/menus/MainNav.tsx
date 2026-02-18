import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="hidden lg:flex flex-row items-center justify-center gap-4">
      <Link href={'/business'}>Businesses</Link>
      <Link href={'/'}>Jobs</Link>
      <Link href={'/'}>Events</Link>
    </nav>
  )
}

