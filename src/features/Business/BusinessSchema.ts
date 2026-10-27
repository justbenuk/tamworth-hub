import z from "zod";

export const CategorySchema = z.object({
  name: z.string().trim().min(1, "Must have a name"),
  description: z.string().optional(),
  icon: z.string().optional(),
  parentId: z.string().optional(),
  sortOrder: z.number().int("Sort order must be a whole number").default(0),
  isActive: z.boolean().default(true),
});

export const BusinessSchema = z.object({
  name: z.string().min(1, "Must have a name"),
  description: z.string().optional(),

  //contact details
  email: z.email().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),

  //location
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  town: z.string().optional(),
  postcode: z.string().optional(),

  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),

  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});
