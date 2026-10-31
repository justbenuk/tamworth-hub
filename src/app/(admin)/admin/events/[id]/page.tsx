import { FectEventById } from "@/features/Events/EventsActions";
import EditEventForm from "@/features/Events/Forms/EditEventForm";
import { notFound } from "next/navigation";

type EventProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EventProps) {
  const id = await params;

  const event = await FectEventById(id)

  if (!event) notFound();
  return <EditEventForm event={event} />
}
