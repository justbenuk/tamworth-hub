"use server";

import z from "zod";
import { RegisterUserSchema, LoginUserSchema } from "./AuthSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

//-----
//Register User
//-----

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

//-----
//Login user
//-----

export async function LoginUserAction(data: z.infer<typeof LoginUserSchema>) {
  try {
    const validated = LoginUserSchema.parse(data);

    await auth.api.signInEmail({
      body: {
        email: validated.email,
        password: validated.password,
      },
      headers: await headers(),
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    throw new Error(`Login User Error: ${error}`);
  }
}
