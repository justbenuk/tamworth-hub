import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import TopHeader from "@/components/Headers/TopHeader";
import MainMenu from "@/components/Menus/MainMenu";
import PageContainer from "@/components/Page/PageContainer";
import { ReactNode } from "react";

type BaseLayout = {
  children: ReactNode;
};

export default function BaseLayout({ children }: BaseLayout) {
  return (
    <div className="min-h-screen flex flex-col -center justify-between">
      <div className="border-b">
        <TopHeader />
        <MainHeader />
        <MainMenu />
      </div>
      <PageContainer className="flex-1 py-10">{children}</PageContainer>
      <MainFooter />
    </div>
  );
}
