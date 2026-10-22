import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { requireUser } from "@/lib/sessions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardHeader() {
  const user = await requireUser();

  if (!user) redirect("/login");

  return (
    <header className="flex flex-row items-center justify-between px-6 py-4 border-b bg-white">
      <SidebarTrigger />
      {user.role === "admin" && (
        <div>
          <Button variant={"destructive"}>
            <Link href={"/admin"}>Admin Dashboard</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
