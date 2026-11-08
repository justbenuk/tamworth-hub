"use server";

import { db } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/sesstions";
import z from "zod";
import { BusinessSchema } from "./BusinessSchema";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

const path = "/dashboard/businesses";

export async function FetchBusinessById({ id }: { id: string }) {
  await requireUser();
  const business = await db.business.findUnique({
    where: { id },
    include: {
      openingHours: true,
      categories: {
        select: {
          categoryId: true,
        },
      },
    },
  });

  if (!business) return notFound();

  return {
    ...business,
    latitude: business.latitude?.toNumber() ?? null,
    longitude: business.longitude?.toNumber() ?? null,
  };
}

export async function FetchAllBusinessesAction() {
  await requireAdmin();
  const businesses = await db.business.findMany();

  return businesses.map(({ latitude, longitude, ...business }) => ({
    ...business,
    latitude: latitude?.toNumber() ?? null,
    longitude: longitude?.toNumber() ?? null,
  }));
}

export async function AddBusinessAction(
  values: z.infer<typeof BusinessSchema>,
) {
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

export async function UpdateBusinessAction(
  id: string,
  values: z.infer<typeof BusinessSchema>,
) {
  const user = await requireUser();
  const isAdmin = user.role === "admin";
  try {
    const validated = BusinessSchema.parse(values);
    const { categoryIds, isFeatured, ...businessData } = validated;

    const listing = await db.business.findUnique({
      where: {
        id,
      },
      select: { ownerId: true },
    });

    if (listing && (listing.ownerId === user.id || isAdmin)) {
      await db.business.update({
        where: {
          id,
          ...(!isAdmin ? { ownerId: user.id } : {}),
        },
        data: {
          ...businessData,
          ...(isAdmin ? { isFeatured } : {}),
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
    } else {
      return { success: false, message: "Unauthorised" };
    }

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
