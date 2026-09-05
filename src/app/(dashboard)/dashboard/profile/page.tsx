import PageContainer from "@/components/PageContainer";
import UserCard from "@/features/profile/components/UserCard";
import { FetchCurrentUserAction } from "@/features/profile/ProfileActions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await FetchCurrentUserAction();
  if (!user) redirect("/login");
  return (
    <PageContainer size="small">
      <div className="grid gap-6">
        <UserCard user={user} />
        <div>change details</div>
        <div>password</div>
        <div>sessions</div>
        <div>groups</div>
        <div>dark mode</div>
        <div>Manage 2fa</div>
        <div>delete data</div>
      </div>
    </PageContainer>
  );
}
