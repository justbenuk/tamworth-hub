import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { FactoryIcon, List } from "lucide-react";
import Link from "next/link";

export default function CompaniesMenu() {
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Companies</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/companies"}>
              <FactoryIcon />
              <span>Companies</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/companies/categories"}>
              <List />
              <span>Categories</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarMenu>
  );
}
