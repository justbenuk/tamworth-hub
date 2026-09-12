import { SidebarTrigger } from "@/components/ui/sidebar";

export default function PortalSidebarHeader() {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-2 border-b">
      <div className="flex flex-row items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <span>Portal</span>
      </div>
    </header>
  );
}
