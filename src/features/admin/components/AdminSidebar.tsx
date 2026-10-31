import AuthMenu from "@/components/Menus/AuthMenu";
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
import AdminBusinessMenus from "@/features/Business/components/AdminBusinessMenus";
import { CastleIcon, LayoutDashboardIcon, PartyPopperIcon } from "lucide-react";
import Link from "next/link";
import AdminSiteMenuItems from "./AdminSiteMenuItems";

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
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={"dashboard"}>
              <Link href={"/admin/events"}>
                <PartyPopperIcon />
                <span>Events</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <AdminSiteMenuItems />
      </SidebarContent>
      <SidebarFooter>
        <AuthMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
