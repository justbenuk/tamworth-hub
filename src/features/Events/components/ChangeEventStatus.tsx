'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventStatus } from "@prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import { UpdateEventStatus } from "../EventsActions"

export default function ChangeEventStatus({ id, status }: { id: string, status: EventStatus }) {
  const [value, setValue] = useState(status)
  const [saving, setSaving] = useState(false)

  async function handleForm(status: EventStatus) {
    const prev = value
    setValue(status)
    setSaving(true)

    try {
      await UpdateEventStatus(id, status)
      toast.success('status updated')
    } catch (error) {
      toast.error('Failed to update status')
    } finally {
      setSaving(false)
    }
  }


  return (
    <Select value={value} onValueChange={handleForm} disabled={saving}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(EventStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {status.replaceAll("_", "")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

