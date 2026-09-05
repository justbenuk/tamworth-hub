import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardSidebarHeader() {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-2 border-b">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}
