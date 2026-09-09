"use server";

import { db } from "@/lib/db";
import { requireUser } from "../authentication/lib/session";
import z from "zod";
import { ChangePasswordSchema } from "./ProfileSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { resend, EMAIL_FROM } from "@/lib/email";
import ChangePasswordEmail from "../../../emails/change-password";

export async function FetchCurrentUserAction() {
  const current = await requireUser();
  return db.user.findUnique({
    where: { id: current.id },
  });
}

export async function ChangePasswordAction(
  data: z.infer<typeof ChangePasswordSchema>,
) {
  const user = await requireUser();

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

    await db.activityLog.create({
      data: {
        userId: user.id,
        feature: "Profile",
        action: "Change",
        description: "User changed password",
      },
    });

    await resend.emails.send({
      from: EMAIL_FROM,
      to: user.email,
      subject: "Your Tamworth Hub password has changed",
      react: ChangePasswordEmail({
        name: user.name,
      }),
    });

    return { success: true, message: "Your password has changed" };
  } catch (error) {
    throw new Error(`Password Change Error: ${error}`);
  }
}
