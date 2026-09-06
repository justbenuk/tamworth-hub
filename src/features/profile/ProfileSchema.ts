import z from "zod";

export const ChangeUserDetailsSchema = z.object({
  name: z.string().min(3, "Your name is required"),
  email: z.email("Please provide a valid email"),
});
