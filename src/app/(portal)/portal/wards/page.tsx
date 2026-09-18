import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WardDialog from "@/features/wards/components/WardDialog";
import AllWardsTable from "@/features/wards/tables/AllWardsTable";
import { FetchAllWardsAction } from "@/features/wards/WardActions";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wards",
};

export const dynamic = "force-dynamic";

export default async function PortalWardsPage() {
  const wards = await FetchAllWardsAction();
  return (
    <PageContainer size="large" className="py-10">
      <div className="grid gap-6">
        <Card className="flex flex-row items-center justify-between">
          <CardHeader>
            <CardTitle>Wards</CardTitle>
          </CardHeader>
          <CardContent>
            <WardDialog />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AllWardsTable wards={wards.data} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
