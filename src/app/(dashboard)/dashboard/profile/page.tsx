import PageContainer from "@/components/PageContainer";
import DeleteUserButton from "@/features/authentication/components/DeleteUserButton";
import ChangePasswordCard from "@/features/profile/components/ChangePasswordCard";
import DarkModeCard from "@/features/profile/components/DarkModeCard";
import ListSessionsCard from "@/features/profile/components/ListSessionsCard";
import UserCard from "@/features/profile/components/UserCard";
import UserGroupsCard from "@/features/profile/components/UserGroupsCard";
import { FetchCurrentUserAction } from "@/features/profile/ProfileActions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await FetchCurrentUserAction();
  if (!user) redirect("/login");
  return (
    <PageContainer size="medium" className="py-20">
      <div className="grid gap-6">
        <UserCard user={user} />
        <ChangePasswordCard />
        <ListSessionsCard />
        <UserGroupsCard />
        <DarkModeCard />
        <DeleteUserButton />
      </div>
    </PageContainer>
  );
}
