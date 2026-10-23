import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LineChartIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

export default function AdminSiteMenuItems() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Site</SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={"/admin/messages"}>
            <MessageCircleIcon />
            <span>Messages</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={"/admin/activity-log"}>
            <LineChartIcon />
            <span>Activity Log</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
