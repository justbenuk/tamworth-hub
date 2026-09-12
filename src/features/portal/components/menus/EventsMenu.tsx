import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { List, PartyPopperIcon } from "lucide-react";
import Link from "next/link";

export default function EventsMenu() {
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>News</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/events"}>
              <PartyPopperIcon />
              <span>Events</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/events/categories"}>
              <List />
              <span>Categories</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarMenu>
  );
}
