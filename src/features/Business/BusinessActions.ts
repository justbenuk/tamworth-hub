"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";

export async function FetchAllCategoriesAction(take?: number) {
  return db.businessCategory.findMany({
    take,
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

export async function ChangeCategoryIsActive(id: string, isActive: boolean) {
  await requireAdmin();

  return db.businessCategory.update({
    where: { id },
    data: {
      isActive,
    },
  });
}

export async function FetchCategoryBySlug(slug: string) {
  return db.businessCategory.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          children: true,
        },
      },
    },
  });
}

export async function AddCategory(values) {
  return { success: false, message: "Test action" };
}

export async function UpdateCategory(values) {
  return { success: false, message: "Test action" };
}
