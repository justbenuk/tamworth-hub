import type { Metadata } from "next";
import { requireUser } from "@/lib/sessions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await requireUser();
  if (!user) redirect("/login");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">Content side</div>
      <div></div>
    </div>
  );
}
