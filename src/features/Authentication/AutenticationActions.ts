"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "./AuthintactionSchema";

export async function RegisterUserAction(
  values: z.infer<typeof RegisterSchema>,
) {
  try {
    const validated = RegisterSchema.parse(values);
    const response = await auth.api.signUpEmail({
      body: {
        ...validated,
        image: "/assets/profile.png",
      },
      headers: await headers(),
    });
    await db.activityLog.create({
      data: {
        actorId: response.user.id,
        actorType: "User",
        action: "user.registered",
        entityType: "registration",
        entityId: response.user.id,
      },
    });
  } catch (error) {
    console.error("Failed to register user", error);
    return {
      success: false,
      message: "Failed to register user",
    };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "User registered" };
}

export async function LoginUserAction(values: z.infer<typeof LoginSchema>) {
  try {
    const validated = LoginSchema.parse(values);
    await auth.api.signInEmail({
      body: {
        ...validated,
      },
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to login", error);
    return {
      success: false,
      message: "Failed to login",
    };
  }
  return { success: true, message: "User logged in" };
}

export async function ResetPasswordAction(
  values: z.infer<typeof ResetPasswordSchema>,
  token: string,
) {
  try {
    const validated = ResetPasswordSchema.parse(values);
    await auth.api.resetPassword({
      body: {
        token,
        ...validated,
      },
      headers: await headers(),
    });
  } catch (error) {
    console.log("Failed to reset password", error);
    return {
      success: false,
      message: "Failed to reset password",
    };
  }
  return { success: true, message: "Password Reset" };
}

export async function ForgotPasswordAction(
  values: z.infer<typeof ForgotPasswordSchema>,
) {
  try {
    const validated = ForgotPasswordSchema.parse(values);
    await auth.api.requestPasswordReset({
      body: {
        email: validated.email,
        redirectTo: "/reset-password",
      },
      headers: await headers(),
    });
  } catch (error) {
    console.log("Failed to process reset", error);
    return {
      success: true,
      message: "Failed to process reset",
    };
  }
  return {
    success: true,
    message:
      "If an email address is valid, an email will be sent to the account holder",
  };
}
