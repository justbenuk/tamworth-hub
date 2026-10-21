"use server";
import { db } from "@/lib/db";

export async function FetchAdminTotalsAction() {
  const [totalUsers] = await db.$transaction([db.user.count()]);

  return { totalUsers };
}
