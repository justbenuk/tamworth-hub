import z from "zod";

export const WardSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  gss: z.string(),
  precision: z.string(),
  geoJson: z.json(),
});

export const CouncilorSchema = z.object({
  name: z.string(),
  email: z.email(),
  faceboo: z.string().optional(),
  twiiter: z.string().optional(),
  instagram: z.string().optional(),
  linkdin: z.string().optional(),
  party: z.string(),
  contactNumber: z.string().optional(),
  wardId: z.string(),
});
