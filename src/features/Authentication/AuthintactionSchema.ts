import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name must be provided"),
    email: z.email("Email must be valid"),
    password: z.string().min(8, "Must be 8 characters long"),
    confirmPassword: z.string().min(8, "Must be 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const LoginSchema = z.object({
  email: z.email("Email must be valid"),
  password: z.string().min(8, "Must be 8 characters long"),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Must be 8 characters long"),
    confirmPassword: z.string().min(8, "Must be 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const ForgotPasswordSchema = z.object({
  email: z.email("Please provide your email"),
});
