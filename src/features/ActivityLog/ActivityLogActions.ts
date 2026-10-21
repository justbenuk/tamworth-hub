"use server";

import { db } from "@/lib/db";

export async function FetchAllActivityLogsAction(take?: number) {
  return db.activityLog.findMany({
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
}
