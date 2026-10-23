"use server";

import z from "zod";
import { ContactSchema } from "./ContactSchemas";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/sessions";
import { ContactStatus } from "@prisma/client";

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

  if (data) {
    await db.contactSubmission.update({
      where: { id },
      data: { status: ContactStatus.IN_PROGRESS },
    });
  }
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
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete submission",
    };
  }
}
