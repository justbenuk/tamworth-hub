import z from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string().min(1, "What's your name?"),
    email: z.email("What's your Email?"),
    password: z.string().min(8, "Password must be 8 charactors"),
    confirmPassword: z.string().min(8, "Password must be 8 charactors"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords Don't Match",
  });

export const LoginUserSchema = z.object({
  email: z.email("What's your Email?"),
  password: z.string().min(8, "Password must be 8 charactors"),
});
