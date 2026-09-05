import PageContainer from "@/components/PageContainer";
import UserCard from "@/features/profile/components/UserCard";
import { FetchCurrentUserAction } from "@/features/profile/ProfileActions";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await FetchCurrentUserAction();
  if (!user) redirect("/login");

  return (
    <PageContainer size="small">
      <div className="absolute top-5 left-5">
        <Link href={"/"} className="flex flex-row items-center gap-2">
          <HomeIcon className="size-5 text-primary" />
          <span>Go Home</span>
        </Link>
      </div>
      <div>
        <UserCard user={user} />
      </div>
    </PageContainer>
  );
}
