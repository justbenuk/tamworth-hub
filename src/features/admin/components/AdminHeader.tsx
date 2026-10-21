import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-4 border-b">
      <SidebarTrigger />
    </header>
  );
}
