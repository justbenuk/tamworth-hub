import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { List, SirenIcon } from "lucide-react";
import Link from "next/link";

export default function CrimeMenu() {
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Crime</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/crinme"}>
              <SirenIcon />
              <span>Crime</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/crime/categories"}>
              <List />
              <span>Categories</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarMenu>
  );
}
