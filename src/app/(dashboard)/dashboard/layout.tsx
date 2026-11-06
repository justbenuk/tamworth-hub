import PageContainer from "@/components/Page/PageContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/Dashboard/Components/DashboardSidebar";
import DashboardSidebarHeader from "@/features/Dashboard/Components/DashboardSidebarHeader";
import { requireAdmin } from "@/lib/sesstions";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar />
      <SidebarInset>
        <DashboardSidebarHeader />
        <PageContainer>{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
