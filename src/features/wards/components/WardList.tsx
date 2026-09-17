import { FetchAllWardsAction } from "@/features/wards/WardActions";
import WardListMapContainer from "./maps/WardListMapContainer";

export default async function WardList() {
  const wards = await FetchAllWardsAction();
  return <WardListMapContainer wards={wards} />;
}
