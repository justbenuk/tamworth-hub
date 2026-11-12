import FooterAuthMenu from "../Menus/FooterAuthMenu";
import FooterMenu from "../Menus/FooterMenu";
import FooterSupportMenu from "../Menus/FooterSupportMenu";
import PageContainer from "../Page/PageContainer";

export default function MainFooter() {
  return (
    <footer className="bg-neutral-950 text-primary-foreground">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 py-10 gap-10">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div>
              <h1 className="text-4xl font-semibold">
                Tamworth <span className="text-primary">Hub</span>
              </h1>
              <span className="font-semibold">Your town. Our community</span>
            </div>
            <p className="text-lg">
              Connecting Tamworth through local news, events, businesses, jobs
              and community stories.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <FooterMenu />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <FooterSupportMenu />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <FooterAuthMenu />
          </div>
        </div>
        <div className="py-2 flex flex-row justify-between border-t">
          <span>&copy; Tamworth Hub | All rights reserved</span>
        </div>
      </PageContainer>
    </footer>
  );
}
