import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, 'Please provide your name'),
  email: z.string().email('Please provide your email address'),
  password: z.string().min(8, 'Your password must be atleast 8 characters'),
  confirmPassword: z.string().min(8, 'Your password must be atleast 8 characters')
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Password do not match'
})

export const loginUserSchema = z.object({
  email: z.string().email('Please provide your email address'),
  password: z.string().min(8, 'Your password must be atleast 8 characters'),
})
