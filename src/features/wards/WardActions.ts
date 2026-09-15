"use server";

import { db } from "@/lib/db";
import z from "zod";
import { CouncillorSchema, WardSchema } from "./WordSchemas";
import { requireAdmin } from "../authentication/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function FetchAllWardsAction() {
  return db.ward.findMany({
    include: {
      councillors: {
        include: {
          image: true,
        },
      },
    },
  });
}

export async function FetchAllCouncillorsAction() {
  return db.councillor.findMany({
    include: {
      ward: true,
      image: true,
    },
  });
}

export async function AddCouncillorAction(
  data: z.infer<typeof CouncillorSchema>,
) {
  await requireAdmin();
  const validated = CouncillorSchema.parse(data);
  try {
    await db.councillor.create({
      data: {
        slug: slugify(validated.name, {
          lower: true,
        }),
        ...validated,
      },
    });
  } catch {
    return { success: false, message: "Failed to add Councillor" };
  }
  return { success: true, message: "Add Councillor" };
}

export async function EditCounillorAction(
  id: string,
  data: z.infer<typeof CouncillorSchema>,
) {
  console.log(data);
  return { success: false, message: "test function" };
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
  } catch {
    return { success: false, message: "Failed to add ward. Please try again." };
  }

  revalidatePath("/portal/wards");
  return { success: true, message: "Ward added." };
}

export async function EditWardAction(
  id: string,
  data: z.infer<typeof WardSchema>,
) {
  await requireAdmin();
  const validated = WardSchema.parse(data);

  try {
    await db.ward.update({
      where: { id },
      data: {
        ...validated,
        slug: slugify(validated.name, {
          lower: true,
        }),
        geoJson:
          validated.geoJson === null ? Prisma.JsonNull : validated.geoJson,
      },
    });
  } catch {
    return {
      success: false,
      message: "Failed to update ward. Please try again.",
    };
  }
  revalidatePath("/portal/wards");
  return { success: true, message: "Updated Ward" };
}

export async function DeleteWardAction(id: string) {
  await requireAdmin();
  try {
    await db.ward.delete({
      where: { id },
    });
  } catch {
    return { success: false, message: "Failed to delete ward" };
  }

  revalidatePath("/portal/wards");
  return { success: true, message: "Ward Deleted" };
}
