import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FactoryIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardOptionsMenu() {
  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/dashboard/business'}>
                <FactoryIcon />
                <span>Business Directory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}

