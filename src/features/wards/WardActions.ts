"use server";

import { db } from "@/lib/db";
import z from "zod";
import { WardSchema } from "./WordSchemas";
import { requireAdmin } from "../authentication/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function FetchAllWardsAction() {
  return db.ward.findMany();
}

export async function AddWardAction(data: z.infer<typeof WardSchema>) {
  await requireAdmin();
  const validated = WardSchema.parse(data);

  try {
    await db.ward.create({
      data: {
        ...validated,
        slug: slugify(validated.name, {
          lower: true,
        }),
        geoJson:
          validated.geoJson === null ? Prisma.JsonNull : validated.geoJson,
      },
    });
  } catch (error) {
    console.error("Failed to add ward:", error);
    return { success: false, message: "Failed to add ward. Please try again." };
  }

  revalidatePath("/portal/wards");
  return { success: true, message: "Ward added." };
}

export async function EditWardAction(
  id: string,
  data: z.infer<typeof WardSchema>,
) {
  return { success: false, message: "Editing wards is not implemented yet." };
}
