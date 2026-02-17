import DashboardSidebar from "@/components/sdiebars/DashboardSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RootProps } from "@/types";

export default function DashboardLayout({ children }: RootProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex flex-row items-center py-4 px-6">
          <SidebarTrigger />
        </header>
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

