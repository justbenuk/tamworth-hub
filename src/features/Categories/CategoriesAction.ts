"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sesstions";
import z from "zod";
import { BusinessCategorySchema } from "./CategoriesSchema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function FetchBusinessPartentCategoriesAction() {
  return db.businessCategory.findMany({
    where: {
      parentId: null,
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function saveCategory(
  values: z.input<typeof BusinessCategorySchema>,
  id?: string,
) {
  await requireAdmin();
  const result = BusinessCategorySchema.safeParse(values);
  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  const data = { ...result.data, parentId: result.data.parentId || null };
  const slug = slugify(data.name, { lower: true, strict: true });

  if (!id && !slug) {
    return {
      success: false,
      message: "Enter a category name containing letters or numbers",
    };
  }

  try {
    await db.$transaction(async (tx) => {
      // Reject self-parenting and choosing a descendant as the parent.
      let parentId = data.parentId;
      const visited = new Set<string>();
      while (parentId) {
        if (parentId === id || visited.has(parentId)) {
          throw new Error(
            "Choose a parent outside this category's descendants",
          );
        }
        visited.add(parentId);
        const parent = await tx.businessCategory.findUnique({
          where: { id: parentId },
          select: { parentId: true },
        });
        if (!parent)
          throw new Error("The selected parent category no longer exists");
        parentId = parent.parentId;
      }

      if (id) {
        // Keep existing URLs stable when the category name changes.
        await tx.businessCategory.update({ where: { id }, data });
      } else {
        await tx.businessCategory.create({ data: { ...data, slug } });
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message:
          error.code === "P2002"
            ? "A category with this URL already exists. Choose a different name."
            : "Unable to save the category. Refresh and try again.",
      };
    }
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to save the category",
    };
  }

  revalidatePath("/dashboard/businesses/categories");
  revalidatePath("/businesses", "layout");
  return { success: true, message: id ? "Category updated" : "Category added" };
}

export async function AddBusinessCategory(
  values: z.input<typeof BusinessCategorySchema>,
) {
  return saveCategory(values);
}

export async function UpdateBusinessCategory(
  id: string,
  values: z.input<typeof BusinessCategorySchema>,
) {
  return saveCategory(values, id);
}

export async function FetchAllBusinessCategoriesAction() {
  await requireAdmin();
  return db.businessCategory.findMany({
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
}
