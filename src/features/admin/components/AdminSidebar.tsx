import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CastleIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import AdminSiteMenuItems from "./AdminSiteMenuItems";
import AdminBusinessMenus from "@/features/Business/components/AdminBusinessMenus";

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
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={"dashboard"}>
              <Link href={"/admin"}>
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <AdminBusinessMenus />
        </SidebarGroup>
        <AdminSiteMenuItems />
      </SidebarContent>
      <SidebarFooter>g</SidebarFooter>
    </Sidebar>
  );
}
