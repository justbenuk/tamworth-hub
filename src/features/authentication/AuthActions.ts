"use server";

import z from "zod";
import { RegisterUserSchema } from "./AuthSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function RegisterUserAction(
  data: z.infer<typeof RegisterUserSchema>,
) {
  try {
    const validated = RegisterUserSchema.parse(data);
    await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        image: "/assets/profile.png",
        password: validated.password,
      },
      headers: await headers(),
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    throw new Error(`Register User Error: ${error}`);
  }
}
