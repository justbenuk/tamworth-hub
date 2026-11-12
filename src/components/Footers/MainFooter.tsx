import FooterAuthMenu from "../Menus/FooterAuthMenu";
import FooterMenu from "../Menus/FooterMenu";
import FooterSupportMenu from "../Menus/FooterSupportMenu";
import PageContainer from "../Page/PageContainer";
import SiteLogo from "../Shared/SiteLogo";

export default function MainFooter() {
  return (
    <footer className="mt-16 bg-foreground text-background">
      <PageContainer>
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="inline-flex rounded-2xl bg-background px-4 py-3">
              <SiteLogo />
            </div>
            <p className="max-w-sm text-sm leading-6 text-background/70">
              Connecting Tamworth through local news, events, businesses, jobs and community stories.
            </p>
          </div>
          <FooterMenu />
          <FooterSupportMenu />
          <FooterAuthMenu />
        </div>
        <div className="flex flex-col gap-2 border-t border-background/15 py-5 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Tamworth Hub. All rights reserved.</span>
          <span>Made for our town.</span>
        </div>
      </PageContainer>
    </footer>
  );
}
