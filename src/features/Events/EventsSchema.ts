import { EventCategory, EventStatus } from "@prisma/client"
import z from "zod"

export const EventsSchema = z.object({
  title: z.string().min(1, 'Event title required'),
  description: z.string().min(1, 'Event description required'),
  image: z.string().optional(),
  category: z.enum(EventCategory, { error: 'Select an event category' }),
  startDate: z.coerce.date({ error: 'Enter a valid start date and time' }),
  endDate: z.coerce.date({ error: 'Enter a valid end date and time' }),
  venue: z.string().min(1, 'Where is the event held'),
  address: z.string().optional(),
  postcode: z.string().optional(),

  organiser: z.string().optional(),
  websiteUrl: z.string().optional(),
  isFree: z.boolean().default(true),
  price: z.string().optional(),
  status: z.enum(EventStatus),
  isFeatured: z.boolean().default(false)
}).refine((data) => !data.endDate || data.endDate >= data.startDate, {
  message: 'End date must be after the start date',
  path: ['endDate']
})

