import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Factory,
  Newspaper,
  PartyPopper,
  PoundSterling,
  Siren,
} from "lucide-react";
import Link from "next/link";

export default function PostsMenu() {
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Posts</SidebarGroupLabel>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/companies"}>
              <Newspaper />
              <span>Companies</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/News"}>
              <Newspaper />
              <span>News</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/Crime"}>
              <Siren />
              <span>Crime</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>{" "}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/Events"}>
              <PartyPopper />
              <span>Events</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>{" "}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/Charities"}>
              <PoundSterling />
              <span>Charities</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>{" "}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"portal/jobs"}>
              <Factory />
              <span>Jobs</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarMenu>
  );
}
