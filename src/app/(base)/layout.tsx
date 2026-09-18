import Footer from "@/components/Footer";
import Header from "@/components/header";
import PageContainer from "@/components/PageContainer";
import WardSidebar from "@/features/wards/components/WardSidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function BaseLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <PageContainer size="large" className="flex-1 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="col-span-1 lg:col-span-7">{children}</div>
          <div className="col-span-1 lg:col-span-3">
            <WardSidebar />
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
