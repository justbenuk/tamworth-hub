"use server";

import z from "zod";
import { LoginSchema, RegisterSchema } from "./AuthSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function LoginUserAction(values: z.infer<typeof LoginSchema>) {
  try {
    const validated = LoginSchema.parse(values);
    await auth.api.signInEmail({
      body: {
        email: validated.email,
        password: validated.email,
      },
      headers: await headers(),
    });
    return { success: true, messages: "User logged in" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to log in" };
  }
}

export async function RegisterUserAction(
  values: z.infer<typeof RegisterSchema>,
) {
  try {
    const validated = RegisterSchema.parse(values);
    await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        password: validated.password,
      },
      headers: await headers(),
    });
    return { success: true, messages: "User Registered" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to register" };
  }
}
