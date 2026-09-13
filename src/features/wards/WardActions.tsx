"use server";

import { db } from "@/lib/db";

export async function FetchAllWardsAction() {
  return db.ward.findMany();
}
