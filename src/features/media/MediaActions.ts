"use server";

import { db } from "@/lib/db";

export async function FetchAllMediaFiles(page = 1) {
  const currentPage = Math.max(1, Math.floor(page));
  const limit = 12;

  const [images, total] = await db.$transaction([
    db.media.findMany({
      skip: (currentPage - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.media.count(),
  ]);
  return {
    success: true,
    images,
    total,
    page: currentPage,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}
