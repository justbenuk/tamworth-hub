import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CastleIcon, LayoutDashboardIcon, LineChartIcon } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={"Home"}>
              <Link href={"/"}>
                <CastleIcon />
                <span>Tamworth Hub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"dashboard"}>
                <Link href={"/admin"}>
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Site</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={"/admin/activity-log"}>
                  <LineChartIcon />
                  <span>Activity Log</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>g</SidebarFooter>
    </Sidebar>
  );
}
