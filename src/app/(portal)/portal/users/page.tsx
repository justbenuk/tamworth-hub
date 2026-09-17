import PageContainer from "@/components/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import AllUsersTable from "@/features/portal/components/tables/AllUsersTable";
import UserStatsCard from "@/features/portal/components/UserStatsCard";
import { FetchAllUsersAction } from "@/features/portal/PortalActions";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
};

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await FetchAllUsersAction();
  return (
    <PageContainer size="large" className="py-10">
      <div className="grid gap-6">
        <UserStatsCard users={users} />
        <Card>
          <CardContent>
            <AllUsersTable users={users} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
