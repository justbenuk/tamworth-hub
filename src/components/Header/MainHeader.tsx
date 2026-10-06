import AuthMenu from "../Menus/AuthMenu";
import MainMenu from "../Menus/MainMenu";
import MobileMenu from "../Menus/MobileMenu";
import SiteLogo from "../Shared/SiteLogo";

export default function MainHeader() {
  return (
    <header className="py-4 bg-primary grid grid-cols-3 items-center px-6 text-primary-foreground">
      <div className="justify-self-start">
        <SiteLogo size="medium" />
      </div>
      <div className="justify-self-center">
        <MainMenu />
      </div>
      <div className="justify-self-end">
        <div className="hidden lg:block">
          <AuthMenu />
        </div>
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
