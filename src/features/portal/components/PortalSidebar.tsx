import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/features/profile/components/UserMenu";
import { auth } from "@/lib/auth";
import { ChurchIcon, LayoutDashboardIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import MessagesMenu from "./menus/MessagesMenu";
import OtherMenu from "./menus/OtherMenu";
import WardsMenu from "./menus/WardsMenu";
import PostsMenu from "./menus/PostsMenu";

export default async function PortalSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"/"}>
              <ChurchIcon />
              <span>Back to site</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/portal"}>
                <LayoutDashboardIcon />
                <span>Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <PostsMenu />
        <WardsMenu />
        <MessagesMenu />
        <OtherMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={session.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
