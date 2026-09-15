import z from "zod";

export const WardSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  gss: z.string(),
  precision: z.string(),
  geoJson: z.json(),
});

export const CouncillorSchema = z.object({
  name: z.string(),
  email: z.email(),
  imageId: z.string().min(1),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  party: z.string(),
  contactNumber: z.string().optional(),
  wardId: z.string(),
  published: z.boolean(),
});
