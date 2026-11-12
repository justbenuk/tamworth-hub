import { FetchPublishedFeaturedBusinessesAction } from "@/features/Businesses/BusinessActions";
import BusinessCard from "@/features/Businesses/Components/BusinessCard";

export default async function FeaturedBusinessList() {
  const featured = await FetchPublishedFeaturedBusinessesAction();
  return (
    <>
      {featured.map((item) => (
        <BusinessCard business={item} key={item.id} />
      ))}
    </>
  );
}
