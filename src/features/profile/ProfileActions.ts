"use server";

import { db } from "@/lib/db";
import { requireUser } from "../authentication/lib/session";
import z from "zod";
import { ChangePasswordSchema } from "./ProfileSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function FetchCurrentUserAction() {
  const current = await requireUser();
  return db.user.findUnique({
    where: { id: current.id },
  });
}

export async function ChangePasswordAction(
  data: z.infer<typeof ChangePasswordSchema>,
) {
  await requireUser();
  try {
    const validated = ChangePasswordSchema.parse(data);

    await auth.api.changePassword({
      body: {
        newPassword: validated.newPassword,
        currentPassword: validated.currentPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });
    return { success: true, message: "Your password has changed" };
  } catch (error) {
    throw new Error(`Password Change Error: ${error}`);
  }
}
