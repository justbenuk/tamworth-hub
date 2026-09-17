import WardList from "@/features/wards/components/WardList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wards",
  description:
    "Explore Tamworth wards and find local news, crime information, jobs and councillors.",
};

export default async function WardsPage() {
  return <WardList />;
}
