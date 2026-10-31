import { Event } from "@prisma/client";
import EventForm from "./EventForm";
import { requireUser } from "@/lib/sessions";

export default async function EditEventForm({ event }: { event: Event }) {
  const user = await requireUser()
  return (
    <EventForm mode="edit" event={event} user={user} />
  )
}

