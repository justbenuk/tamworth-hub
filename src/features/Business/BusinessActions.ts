"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import z from "zod";
import { BusinessSchema, CategorySchema } from "./BusinessSchema";

const path = "/admin/businesses";

export async function FetchBusinessBySlug(slug: string) {
  return db.business.findUnique({
    where: { slug },
    include: {
      openingHours: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}

export default async function DeleteBusinessById(id: string) {
  await requireAdmin();
  try {
    await db.business.delete({
      where: { id },
    });
    revalidatePath(path);
    return { success: true, message: "Business Deleted" };
  } catch (error) {
    console.error("Failed to delete business", error);
    return { success: false, message: "Failed to delete business" };
  }
}

export async function FetchBusinessById({ id }: { id: string }) {
  await requireAdmin();
  return db.business.findUnique({
    where: { id },
    include: {
      categories: { select: { categoryId: true } },
      openingHours: { orderBy: [{ dayOfWeek: "asc" }, { openTime: "asc" }] },
    },
  });
}

export async function FetchAllBusinesses() {
  await requireAdmin();
  return db.business.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function AddBusiness(values: z.infer<typeof BusinessSchema>) {
  await requireAdmin();
  try {
    const validated = BusinessSchema.parse(values);
    const { categoryIds, ...businessData } = validated;

    await db.business.create({
      data: {
        ...businessData,
        slug: slugify(validated.name, {
          lower: true,
        }),
        openingHours: {
          create: validated.openingHours,
        },
        categories: {
          create: [...new Set(categoryIds)].map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });
    revalidatePath(path);
    return { success: true, message: "Added new business" };
  } catch (error) {
    console.error("Failed to add business", error);
    return {
      success: false,
      message: "Failed to add business",
    };
  }
}

export async function UpdateBusiness(
  id: string,
  values: z.infer<typeof BusinessSchema>,
) {
  await requireAdmin();
  try {
    const validated = BusinessSchema.parse(values);
    const { categoryIds, ...businessData } = validated;
    await db.business.update({
      where: { id },
      data: {
        ...businessData,
        slug: slugify(validated.name, {
          lower: true,
        }),
        openingHours: {
          deleteMany: {},
          create: validated.openingHours,
        },
        categories: {
          deleteMany: {},
          create: [...new Set(categoryIds)].map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });

    revalidatePath(path);
    return { success: true, message: "Updated business" };
  } catch (error) {
    console.error("Failed to update business", error);
    return {
      success: false,
      message: "Failed to update business",
    };
  }
}

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

async function saveCategory(
  values: z.input<typeof CategorySchema>,
  id?: string,
) {
  await requireAdmin();
  const result = CategorySchema.safeParse(values);
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

  revalidatePath("/admin/businesses/categories");
  revalidatePath("/businesses", "layout");
  return { success: true, message: id ? "Category updated" : "Category added" };
}

export async function AddCategory(values: z.input<typeof CategorySchema>) {
  return saveCategory(values);
}

export async function UpdateCategory(
  id: string,
  values: z.input<typeof CategorySchema>,
) {
  return saveCategory(values, id);
}
