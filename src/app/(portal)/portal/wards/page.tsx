import PageContainer from "@/components/PageContainer";
import AllWardsTable from "@/features/portal/components/tables/AllWardsTable";
import { FetchAllWardsAction } from "@/features/wards/WardActions";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wards",
};
export default async function PortalWardsPage() {
  const wards = await FetchAllWardsAction();
  return (
    <PageContainer size="large" className="py-10">
      <div>
        <AllWardsTable wards={wards} />
      </div>
    </PageContainer>
  );
}
