import z from "zod";

export const WardSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  gss: z.string(),
  precision: z.string(),
  geoJson: z.json(),
});
