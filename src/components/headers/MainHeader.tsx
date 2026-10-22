import Image from "next/image";
import Link from "next/link";
import PageContainer from "../PageContainer";

export default function MainHeader() {
  const categories = ["NEWS", "PEOPLE", "PLACES", "COMMUNITY"];

  return (
    <div className="relative overflow-hidden bg-white border-b">
      {/* Castle photograph */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <Image
          src="/images/tamworth-castle.jpg"
          alt="Tamworth Castle"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 0px"
          className="object-cover object-center"
        />

        {/* Fade photograph into white */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent" />

        {/* Fade bottom edge */}
        <div className="absolute inset-0 bg-linear-to-t from-white/80 via-transparent to-transparent" />
      </div>

      <div className=" relative z-10 flex min-h-31.25 items-center justify-between gap-8 py-5 lg:min-h-38.75">
        {/* Logo and categories */}
        <PageContainer className="flex flex-row justify-between">
          <Link href="/" className="shrink-0">
            <div className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none tracking-[-0.035em] text-black">
              TAMWORTH <span className="text-brand-red">HUB</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[9px] font-semibold tracking-[0.24em] text-black sm:gap-x-3 sm:text-[11px]">
              {categories.map((category, index) => (
                <span
                  key={category}
                  className="flex items-center gap-x-2 sm:gap-x-3"
                >
                  {index > 0 && <span className="text-neutral-500">|</span>}
                  {category}
                </span>
              ))}
            </div>
          </Link>

          {/* Handwritten tagline */}
          <div className="relative hidden shrink-0 lg:block">
            <div className="flex -rotate-6 flex-col font-handwritten text-[clamp(1.8rem,2.5vw,2.8rem)] leading-[0.85] text-black">
              <span>Your town.</span>
              <span className="translate-x-8">Our community.</span>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}
