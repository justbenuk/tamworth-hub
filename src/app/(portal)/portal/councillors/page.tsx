import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddCouncillorForm from "@/features/wards/forms/AddcouncillorForm";
import AllCouncillorsTable from "@/features/wards/tables/AllCouncillorsTable.";
import {
  FetchAllCouncillorsAction,
  FetchAllWardsAction,
} from "@/features/wards/WardActions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Councillors",
};

export const dynamic = "force-dynamic";

export default async function DashboardCouncillorsPage() {
  const councillors = await FetchAllCouncillorsAction();
  const wards = await FetchAllWardsAction();
  return (
    <PageContainer size="large" className="py-10">
      <div className="grid gap-6">
        <Card className="flex flex-row items-center justify-between">
          <CardHeader>
            <CardTitle>Councillors</CardTitle>
          </CardHeader>
          <CardContent>
            <AddCouncillorForm wards={wards} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AllCouncillorsTable councillors={councillors} wards={wards} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
