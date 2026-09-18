import WardListMapContainer from "@/features/wards/components/maps/WardListMapContainer";
import { FetchAllWardsAction } from "@/features/wards/WardActions";

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wards",
  description:
    "Explore Tamworth wards and find local news, crime information, jobs and councillors.",
};

export default async function WardsPage() {
  const wards = await FetchAllWardsAction();
  if (!wards) return <div>No Wards</div>;

  return (
    <>
      <Suspense fallback={<p>loading</p>}>
        <WardListMapContainer wards={wards} />;
      </Suspense>
    </>
  );
}
