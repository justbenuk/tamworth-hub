import Footer from "@/components/footers/Footer";
import MainHeader from "@/components/headers/MainHeader";
import SiteMenu from "@/components/Menus/SiteMenu";
import TopMenu from "@/components/Menus/TopMenu";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <TopMenu />
        <MainHeader />
        <SiteMenu />
      </div>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
