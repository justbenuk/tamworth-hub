import SiteMenu from "../Menus/SiteMenu";
import SiteLogo from "../SiteLogo";

export default function MainHeader() {
  return (
    <div className="flex flex-row items-center justify-between py-4 px-6 border-b">
      <SiteLogo size="small" />
      <SiteMenu />
    </div>
  );
}
