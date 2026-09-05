import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireUser } from "@/features/authentication/lib/session";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardSidebarHeader from "@/features/dashboard/components/DashboardSidebarHeader";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function ProfileLayout({ children }: Props) {
  await requireUser();
  return (
    <SidebarProvider>
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <DashboardSidebarHeader />
        <div className="mt-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
