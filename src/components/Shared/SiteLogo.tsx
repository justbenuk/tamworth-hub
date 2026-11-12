import Link from "next/link";

export default function SiteLogo() {
  const categories = ["NEWS", "PEOPLE", "PLACES", "COMMUNITY"];
  return (
    <Link href="/" className="shrink-0">
      <div className="sm:text-4xl lg:text-6xl text-black dark:text-white font-semibold">
        TAMWORTH <span className="text-primary">HUB</span>
      </div>
      <div className="mt-2 hidden md:flex flex-wrap items-center gap-x-2 text-[9px] font-semibold tracking-[0.24em] text-black dark:text-white sm:gap-x-3 sm:text-[11px]">
        {categories.map((category, index) => (
          <span key={category} className="flex items-center gap-x-2 sm:gap-x-3">
            {index > 0 && <span className="text-neutral-500">|</span>}
            {category}
          </span>
        ))}
      </div>
    </Link>
  );
}
