"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "../authentication/lib/session";

export async function DashboardStats() {
  await requireAdmin();

  const [members, media] = await db.$transaction([
    db.user.count(),
    db.media.count(),
  ]);

  return { members, media };
}

export async function FetchAllUsersAction() {
  await requireAdmin();
  return db.user.findMany();
}
