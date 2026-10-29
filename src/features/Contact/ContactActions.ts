"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";
import { ContactStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import { ContactSchema } from "./ContactSchemas";

export async function ContactFormAction(values: z.infer<typeof ContactSchema>) {
  try {
    const validated = ContactSchema.parse(values);
    await db.contactSubmission.create({
      data: {
        ...validated,
      },
    });
    revalidatePath("/contact", "layout");
    revalidatePath("/admin/messages");
    return { success: true, message: "Message Sent" };
  } catch (error) {
    console.error("Failed to send message", error);
    return {
      success: false,
      message: "Failed to send message",
    };
  }
}

export async function FetchAllMessagesAction() {
  await requireAdmin();
  return await db.contactSubmission.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function UpdateContactFormStatus(
  id: string,
  status: ContactStatus,
) {
  await requireAdmin();
  return db.contactSubmission.update({
    where: { id },
    data: { status },
  });
}

export async function GetContactSubmisionById({ id }: { id: string }) {
  await requireAdmin();
  const data = await db.contactSubmission.findUnique({
    where: { id },
  });
  return data;
}

export async function DeleteSubmissionById(id: string) {
  await requireAdmin();
  try {
    await db.contactSubmission.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true, message: "Submission deleted" };
  } catch (error) {
    console.error("Failed to delete message", error);
    return {
      success: false,
      message: "Failed to delete submission",
    };
  }
}
