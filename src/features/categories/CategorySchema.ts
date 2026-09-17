import z from "zod";
import { CategoryType } from "@prisma/client";

export const CategorySchema = z.object({
  name: z
    .string("You must provide a category name")
    .trim()
    .min(1, "You must provide a category name"),
  type: z.enum(CategoryType),
});
