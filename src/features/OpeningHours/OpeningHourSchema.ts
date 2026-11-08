import { z } from "zod";

export const openingHourSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    openTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a valid time"),
    closeTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a valid time"),
  })
  .refine(({ openTime, closeTime }) => openTime !== closeTime, {
    message: "Opening and closing times must differ",
    path: ["closeTime"],
  });

export const openingHoursSchema = z.array(openingHourSchema);

export type OpeningHourInput = z.infer<typeof openingHourSchema>;

export const defaultOpeningHours: OpeningHourInput[] = Array.from(
  { length: 5 },
  (_, i) => ({
    dayOfWeek: i + 1,
    openTime: "09:00",
    closeTime: "17:00",
  }),
);
