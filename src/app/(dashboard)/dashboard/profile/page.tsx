import PageContainer from "@/components/PageContainer";
import ChangePasswordCard from "@/features/profile/components/ChangePasswordCard";
import ListSessionsCard from "@/features/profile/components/ListSessionsCard";
import UserCard from "@/features/profile/components/UserCard";
import { FetchCurrentUserAction } from "@/features/profile/ProfileActions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await FetchCurrentUserAction();
  if (!user) redirect("/login");
  return (
    <PageContainer size="medium">
      <div className="grid gap-6">
        <UserCard user={user} />
        <ChangePasswordCard />
        <ListSessionsCard />
        <div>groups</div>
        <div>dark mode</div>
        <div>Manage 2fa</div>
        <div>delete data</div>
      </div>
    </PageContainer>
  );
}
