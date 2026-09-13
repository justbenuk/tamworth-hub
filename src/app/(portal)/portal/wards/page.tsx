import PageContainer from "@/components/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import WardDialog from "@/features/wards/components/WardDialog";
import AllWardsTable from "@/features/wards/tables/AllWardsTable";
import { FetchAllWardsAction } from "@/features/wards/WardActions";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wards",
};
export default async function PortalWardsPage() {
  const wards = await FetchAllWardsAction();
  return (
    <PageContainer size="large" className="py-10">
      <div className="grid gap-6">
        <WardDialog />
        <Card>
          <CardContent>
            <AllWardsTable wards={wards} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
