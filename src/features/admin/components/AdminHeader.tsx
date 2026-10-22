import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-4 border-b bg-white">
      <SidebarTrigger />
      <div>
        <Button variant={"destructive"}>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    </header>
  );
}
