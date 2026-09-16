"use server";

import z from "zod";
import { CategorySchema } from "./CategorySchema";
import { db } from "@/lib/db";
import { requireAdmin } from "../authentication/lib/session";
import slugify from "slugify";

export async function AddCategory(data: z.infer<typeof CategorySchema>) {
  await requireAdmin();
  const result = CategorySchema.safeParse(data);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }
  const validated = result.data;
  try {
    await db.category.create({
      data: {
        slug: slugify(validated.name, {
          lower: true,
        }),
        ...validated,
      },
    });
  } catch {
    return { success: false, message: "Failed to add category" };
  }
  return { success: true, message: "Added Category" };
}

export async function EditCategory(
  id: string,
  data: z.infer<typeof CategorySchema>,
) {
  return { success: false, message: "Placeholder" };
}

export async function FetchCategoryBySlug(slug: string) {
  return db.category.findFirst({
    where: { slug },
  });
}

export async function FetchAllCategories() {
  return db.category.findMany();
}
