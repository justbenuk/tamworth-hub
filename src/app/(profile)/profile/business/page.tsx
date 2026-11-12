import EmptyCard from "@/components/Shared/EmptyCard";

export default function BusinessPage() {
  const businesses = null;
  return (
    <div>
      {businesses ? (
        <div>business will go here</div>
      ) : (
        <EmptyCard
          title="No Businesses"
          description="You currently have no businesses assigned to you"
        />
      )}
    </div>
  );
}
