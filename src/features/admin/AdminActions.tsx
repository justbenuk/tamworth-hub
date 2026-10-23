"use server";
import { db } from "@/lib/db";

export async function FetchAdminTotalsAction() {
  const [totalUsers, totalMessages] = await db.$transaction([
    db.user.count(),
    db.contactSubmission.findMany(),
  ]);

  const totalNewMessages = totalMessages.filter(
    (message) => message.status === "NEW",
  ).length;

  return { totalUsers, totalNewMessages };
}
