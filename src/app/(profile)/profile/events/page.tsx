import EmptyCard from "@/components/Shared/EmptyCard";

export default function EventsPage() {
  const events = null;
  return (
    <div>
      {events ? (
        <div>events will go here</div>
      ) : (
        <EmptyCard
          title="No Events"
          description="You currently have no events assigned to you"
        />
      )}
    </div>
  );
}
