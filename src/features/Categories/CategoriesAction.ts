"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sesstions";
import z from "zod";
import { BusinessCategorySchema } from "./CategoriesSchema";

export async function AddBusinessCategory(
  values: z.infer<typeof BusinessCategorySchema>,
) {
  return { success: false, message: "Testing the action" };
}

export async function UpdateBusinessCategory(
  id: string,
  values: z.infer<typeof BusinessCategorySchema>,
) {
  return { success: false, message: "Testing the action" };
}

export async function FetchAllBusinessCategoriesAction() {
  await requireAdmin();
  try {
    const data = await db.businessCategory.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        _count: {
          select: {
            children: true,
          },
        },
      },
    });

    return { success: true, data };
  } catch (error) {
    console.log(`Business categories:`, error);
    return { success: false, message: "Failed to fetch categories" };
  }
}
