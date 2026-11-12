import EmptyCard from "@/components/Shared/EmptyCard";

export default function MessagesPage() {
  const messages = null;
  return (
    <div>
      {messages ? (
        <div>messages will go here</div>
      ) : (
        <EmptyCard
          title="No Messages"
          description="You currently have no messages"
        />
      )}
    </div>
  );
}
