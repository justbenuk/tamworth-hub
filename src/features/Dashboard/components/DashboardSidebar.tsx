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
import {
  CastleIcon,
  FactoryIcon,
  LayoutDashboardIcon,
  List,
  PartyPopperIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export default function DashboardSidebar() {
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
                <Link href={"/dashboard"}>
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Profile"}>
                <Link href={"/dashboard/profile"}>
                  <UserIcon />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Businesses"}>
                <Link href={"/dashboard/businesses"}>
                  <FactoryIcon />
                  <span>Businesses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Events"}>
                <Link href={"/dashboard/events"}>
                  <PartyPopperIcon />
                  <span>Events</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Jobs"}>
                <Link href={"/dashboard/jobs"}>
                  <List />
                  <span>Jobs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <AuthMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
