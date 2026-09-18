import WardListMapContainer from "@/features/wards/components/maps/WardListMapContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wards",
  description:
    "Explore Tamworth wards and find local news, crime information, jobs and councillors.",
};

export default async function WardsPage() {
  return <WardListMapContainer />;
}
