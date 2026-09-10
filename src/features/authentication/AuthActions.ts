"use server";

import z from "zod";
import { RegisterUserSchema, LoginUserSchema } from "./AuthSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

//-----
//Register User
//-----

export async function RegisterUserAction(
  data: z.infer<typeof RegisterUserSchema>,
) {
  try {
    const validated = RegisterUserSchema.parse(data);
    const response = await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        image: "/assets/profile.png",
        password: validated.password,
      },
      headers: await headers(),
    });

    await db.activityLog.create({
      data: {
        userId: response.user.id,
        feature: "Authentication",
        action: "Access",
        description: "User Registered",
      },
    });

    revalidatePath("/", "layout");
    return { success: true, message: "User registered" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to register user",
    };
  }
}

//-----
//Login user
//-----

export async function LoginUserAction(data: z.infer<typeof LoginUserSchema>) {
  try {
    const validated = LoginUserSchema.parse(data);

    const response = await auth.api.signInEmail({
      body: {
        email: validated.email,
        password: validated.password,
      },
      headers: await headers(),
    });

    await db.activityLog.create({
      data: {
        userId: response.user.id,
        feature: "Authentication",
        action: "Access",
        description: "User Signed In",
      },
    });

    revalidatePath("/", "layout");
    return { success: true, message: "User logged in" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to log in",
    };
  }
}
