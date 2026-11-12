import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.email("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password"],
    message: "Passwords Don't Match",
  });

export const LoginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["password"],
    message: "Passwords Don't Match",
  });
