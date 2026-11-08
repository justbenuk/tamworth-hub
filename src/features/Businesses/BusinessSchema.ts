import z from "zod";
import { openingHoursSchema } from "../OpeningHours/OpeningHourSchema";

export const BusinessSchema = z.object({
  name: z.string().min(1, "Must have a name"),
  description: z.string().optional(),
  image: z
    .union([
      z.url(),
      z.literal(""),
      z.literal("/images/business-placeholder.svg"),
    ])
    .optional(),

  //contact details
  email: z.union([z.email(), z.literal("")]).optional(),
  phone: z.string().optional(),
  website: z.string().optional(),

  //location
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  town: z.string().optional(),
  postcode: z.string().optional(),

  openingHours: openingHoursSchema,

  //map location
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),

  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),

  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});
