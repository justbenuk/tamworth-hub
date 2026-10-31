'use server'

import { db } from "@/lib/db"
import { requireAdmin, requireUser } from "@/lib/sessions"
import z from "zod"
import { EventsSchema } from "./EventsSchema"
import slugify from 'slugify'
import { revalidatePath } from "next/cache"
import { EventStatus } from "@prisma/client"

const path = '/admin/events'

const today = new Date();
today.setHours(0, 0, 0, 0);

export async function FetchAllEvents() {
  await requireAdmin()
  return db.event.findMany()
}

export async function AddEvent(values: z.infer<typeof EventsSchema>) {
  const user = await requireUser()
  try {
    const validated = EventsSchema.parse(values)

    await db.event.create({
      data: {
        ...validated,
        userId: user.id,
        slug: slugify(validated.title, {
          lower: true,
          strict: true
        })
      }
    })

    revalidatePath(path)
    return { success: true, message: 'Event Added' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Failed to add event' }
  }
}

export async function UpdateEvent(id: string, values: z.infer<typeof EventsSchema>) {
  const user = await requireUser()
  try {
    const validated = EventsSchema.parse(values)

    await db.event.update({
      where: { id },
      data: {
        ...validated,
        userId: user.id,
        slug: slugify(validated.title, {
          lower: true,
          strict: true
        })
      }
    })
    revalidatePath(path)

    return { success: true, message: 'Updated event' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Failed to update event' }
  }
}

export async function UpdateEventStatus(id: string, status: EventStatus) {
  await requireAdmin()
  return db.event.update({
    where: { id },
    data: { status }
  })
}

export async function FetchAllPublishedEvents() {
  return db.event.findMany({
    where: {
      status: 'PUBLISHED', startDate: {
        gte: today,
      }
    },
    orderBy: {
      isFeatured: 'desc'
    }
  })
}

export async function FectEventById({ id }: { id: string }) {
  await requireAdmin()
  return db.event.findUnique({
    where: { id }
  })
}
