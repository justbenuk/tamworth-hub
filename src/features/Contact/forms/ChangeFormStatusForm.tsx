"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateContactFormStatus } from "../ContactActions";
import { ContactStatus } from "@prisma/client";

export default function ChangeFormStatusForm({
  id,
  status,
}: {
  id: string;
  status: ContactStatus;
}) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function handleForm(status: ContactStatus) {
    const previous = value;
    setValue(status);
    setSaving(true);

    try {
      await UpdateContactFormStatus(id, status);
      toast.success("Status Updated");
    } catch {
      setValue(previous);
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  }
  return (
    <Select value={value} onValueChange={handleForm} disabled={saving}>
      <SelectTrigger className="w-full">
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.values(ContactStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {status.replaceAll("_", "")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
