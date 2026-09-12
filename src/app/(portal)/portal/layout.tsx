import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { requireAdmin } from "@/features/authentication/lib/session";
import PortalSidebar from "@/features/portal/components/PortalSidebar";
import PortalSidebarHeader from "@/features/portal/components/PortalSidebarHeader";
import { ReactNode } from "react";

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return (
    <SidebarProvider>
      <PortalSidebar variant="inset" />
      <SidebarInset>
        <PortalSidebarHeader />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
