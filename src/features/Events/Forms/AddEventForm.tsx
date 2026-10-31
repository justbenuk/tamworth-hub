import EventForm from "./EventForm";
import { requireUser } from "@/lib/sessions";

export default async function AddEventForm() {
  const user = await requireUser()
  return (
    <EventForm mode="add" user={user} />
  )
}

