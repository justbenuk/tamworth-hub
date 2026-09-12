import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { List, PoundSterlingIcon } from "lucide-react";
import Link from "next/link";

export default function JobsMenu() {
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Jobs</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/jobs"}>
              <PoundSterlingIcon />
              <span>Jobs</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/jobs/categories"}>
              <List />
              <span>Categories</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarMenu>
  );
}
