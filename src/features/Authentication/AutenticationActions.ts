"use server";

import z from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "./AuthintactionSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function RegisterUserAction(
  values: z.infer<typeof RegisterSchema>,
) {
  const validated = RegisterSchema.parse(values);

  try {
    await auth.api.signUpEmail({
      body: {
        ...validated,
        image: "/assets/profile.png",
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to register user",
    };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "User registered" };
}

export async function LoginUserAction(values: z.infer<typeof LoginSchema>) {
  const validated = LoginSchema.parse(values);

  try {
    await auth.api.signInEmail({
      body: {
        ...validated,
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to login",
    };
  }
  return { success: true, message: "User logged in" };
}

export async function ResetPasswordAction(
  values: z.infer<typeof ResetPasswordSchema>,
  token: string,
) {
  const validated = ResetPasswordSchema.parse(values);

  try {
    await auth.api.resetPassword({
      body: {
        token,
        ...validated,
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to reset password",
    };
  }
  return { success: true, message: "Password Reset" };
}

export async function ForgotPasswordAction(
  values: z.infer<typeof ForgotPasswordSchema>,
) {
  const validated = ForgotPasswordSchema.parse(values);

  try {
    await auth.api.requestPasswordReset({
      body: {
        email: validated.email,
        redirectTo: "/reset-password",
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      success: true,
      message:
        error instanceof Error ? error.message : "Failed to process reset",
    };
  }
  return {
    success: true,
    message:
      "If an email address is valid, an email will be sent to the account holder",
  };
}
