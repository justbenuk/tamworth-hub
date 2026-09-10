import z from "zod";

export const ChangeUserDetailsSchema = z.object({
  name: z.string().min(3, "Your name is required"),
  email: z.email("Please provide a valid email"),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Please provide your current password"),
    newPassword: z.string().min(8, "Password must be 8 charactors"),
    confirmPassword: z.string().min(8, "Password must be 8 charactors"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["newPassword"],
    message: "Passwords don't match",
  });
