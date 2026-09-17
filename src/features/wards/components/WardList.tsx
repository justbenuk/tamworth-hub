import { FetchAllWardsAction } from "@/features/wards/WardActions";
import WardListMapContainer from "./maps/WardListMapContainer";

export default async function WardList() {
  const wards = await FetchAllWardsAction();
  if (!wards) return <div>No Wards</div>;
  return <WardListMapContainer wards={wards} />;
}
