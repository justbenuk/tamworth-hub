import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import MainMenu from "@/components/Menus/MainMenu";
import ProfileMenu from "@/components/Menus/ProfileMenu";
import PageContainer from "@/components/Page/PageContainer";
import { requireUser } from "@/lib/sesstions";
import { ReactNode } from "react";

type BaseLayout = {
  children: ReactNode;
};

export default async function ProfileLayout({ children }: BaseLayout) {
  const user = await requireUser();

  return (
    <div className="min-h-screen flex flex-col -center justify-between">
      <div className="border-b">
        <MainHeader />
        <MainMenu />
      </div>
      <PageContainer size="small" className="flex-1 py-10">
        <ProfileMenu />
        {children}
      </PageContainer>
      <MainFooter />
    </div>
  );
}
