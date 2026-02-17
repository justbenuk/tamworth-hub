import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "../ui/sidebar";
import DashboardSidebarFooter from "./DashboardSidebarFooter";
import { HomeIcon, LayoutDashboardIcon } from "lucide-react";
import DashboardOptionsMenu from "./menues/DashboardOptionsMenu";

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/'}>
                <HomeIcon />
                <span>Back to site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={'/dashboard'}>
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <DashboardOptionsMenu />
      </SidebarContent>
      <SidebarFooter>
        <DashboardSidebarFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

