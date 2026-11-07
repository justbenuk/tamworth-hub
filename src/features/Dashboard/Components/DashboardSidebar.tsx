import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Factory,
  HomeIcon,
  List,
  Minus,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href={"/"} />} tooltip={"Home"}>
              <HugeiconsIcon icon={HomeIcon} />
              <span>Go Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger render={<SidebarMenuButton />}>
                  <HugeiconsIcon icon={Factory} />
                  <span>Businesses</span>
                  <HugeiconsIcon
                    icon={Plus}
                    className="ml-auto group-data-[panel-open]/collapsible:hidden"
                  />
                  <HugeiconsIcon
                    icon={Minus}
                    className="ml-auto hidden group-data-[panel-open]/collapsible:block"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        render={<Link href={"/dashboard/businesses/new"} />}
                      >
                        <HugeiconsIcon icon={Plus} />
                        <span>Add Business</span>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        render={<Link href={"/dashboard/businesses"} />}
                      >
                        <HugeiconsIcon icon={Factory} />
                        <span>All Businesses</span>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        render={
                          <Link href={"/dashboard/businesses/categories"} />
                        }
                      >
                        <HugeiconsIcon icon={List} />
                        <span>Categories</span>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
