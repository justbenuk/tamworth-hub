"use server";

import { db } from "@/lib/db";
import { requireUser } from "../authentication/lib/session";

export async function FetchCurrentUserAction() {
  const current = await requireUser();
  return db.user.findUnique({
    where: { id: current.id },
  });
}
