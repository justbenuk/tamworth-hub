import PageContainer from "../Page/PageContainer";
import SiteLogo from "../Shared/SiteLogo";
import MobileMenu from "../Menus/MobileMenu";

export default function MainHeader() {
  return (
    <header className="border-b bg-background">
      <div className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-2/5 bg-[url('/images/tamworth-castle.jpg')] bg-cover bg-center opacity-15 lg:block" />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-3/5 bg-gradient-to-r from-background via-background/90 to-transparent lg:block" />
        <PageContainer className="flex min-h-20 items-center justify-between gap-6 py-4 sm:min-h-24">
          <SiteLogo />
          <MobileMenu />
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground lg:block">
            Discover what makes our town a great place to live, work and visit.
          </p>
        </PageContainer>
      </div>
    </header>
  );
}
