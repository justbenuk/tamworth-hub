import PageContainer from "@/components/PageContainer";
import WardListMapContainer from "@/features/wards/components/maps/WardListMapContainer";
import { FetchAllWardsAction } from "@/features/wards/WardActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wards" };

export default async function WardsPage() {
  const wards = await FetchAllWardsAction();
  return (
    <PageContainer size="medium" className="py-10">
      <WardListMapContainer wards={wards} />
    </PageContainer>
  );
}
