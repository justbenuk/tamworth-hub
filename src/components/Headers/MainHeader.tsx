import PageContainer from "../Page/PageContainer";
import Image from "next/image";
import SiteLogo from "../Shared/SiteLogo";
import MobileMenu from "../Menus/MobileMenu";
export default function MainHeader() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-neutral-950 border-b">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <Image
          src="/images/tamworth-castle.jpg"
          alt="Tamworth Castle"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 0px"
          className="object-cover object-center dark:grayscale"
        />

        <div className="absolute inset-0 bg-linear-to-r from-white dark:from-neutral-950 via-white/70 dark:via-neutral-950/70 to-transparent" />

        {/* Fade bottom edge */}
        <div className="absolute inset-0 bg-linear-to-t from-white/80 dark:from-neutral-950/80 via-transparent to-transparent" />
      </div>

      <div className=" relative z-10 flex min-h-31.25 items-center justify-between gap-8 py-5 lg:min-h-38.75">
        <PageContainer className="flex flex-row items-center justify-between">
          <SiteLogo />
          <MobileMenu />
        </PageContainer>
      </div>
    </div>
  );
}
