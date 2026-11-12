import z from "zod";

export const BusinessCategorySchema = z.object({
  name: z.string().trim().min(1, "Must have a name"),
  description: z.string().optional(),
  image: z.string().optional(),
  icon: z.string().optional(),
  parentId: z.string().optional(),
  sortOrder: z.number().int("Sort order must be a whole number").default(0),
  isActive: z.boolean().default(true),
});
