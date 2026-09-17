import WardListMapContainer from "@/features/wards/components/maps/WardListMapContainer";
import { FetchAllWardsAction } from "@/features/wards/WardActions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wards",
  description:
    "Explore Tamworth wards and find local news, crime information, jobs and councillors.",
};

const dynamic = "force-dynamic";

export default async function WardsPage() {
  const wards = await FetchAllWardsAction();
  return <WardListMapContainer wards={wards} />;
}
