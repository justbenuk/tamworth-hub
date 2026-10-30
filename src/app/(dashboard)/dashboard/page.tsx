import EmptyCard from "@/components/EmptyCard";
import { requireUser } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/login");
  return (
    <div>
      <EmptyCard title={'Under Construction'} description="This is an on going project, so please comeback as things move forward" />
    </div>
  );
}
