import EmptyCard from "@/components/Shared/EmptyCard";

export default function JobsPage() {
  const jobs = null;
  return (
    <div>
      {jobs ? (
        <div>jobs will go here</div>
      ) : (
        <EmptyCard
          title="No Jobs"
          description="You currently have no jobs assigned to you"
        />
      )}
    </div>
  );
}
