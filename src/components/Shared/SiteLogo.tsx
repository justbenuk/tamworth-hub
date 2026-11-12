import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link href="/" aria-label="Tamworth Hub home" className="group inline-flex shrink-0 flex-col">
      <span className="text-2xl font-bold tracking-[-0.06em] text-foreground sm:text-3xl">
        Tamworth <span className="text-primary transition-colors group-hover:text-primary/80">Hub</span>
      </span>
      <span className="mt-0.5 text-[10px] font-medium tracking-[0.14em] text-muted-foreground sm:text-xs">
        YOUR TOWN. OUR COMMUNITY.
      </span>
    </Link>
  );
}
