"use server";

import z from "zod";
import { ContactSchema } from "./ContactSchemas";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/sessions";

export async function ContactFormAction(values: z.infer<typeof ContactSchema>) {
  const validated = ContactSchema.parse(values);

  try {
    await db.contactSubmission.create({
      data: {
        ...validated,
      },
    });
    revalidatePath("/contact", "layout");
    revalidatePath("/admin/messages");
    return { success: true, message: "Message Sent" };
  } catch (error) {
    return {
      sucess: false,
      message: error instanceof Error ? error.message : "Failed to send form",
    };
  }
}

export async function FetchAllMessagesAction() {
  await requireAdmin();
  return await db.contactSubmission.findMany();
}
