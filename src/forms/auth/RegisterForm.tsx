'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { authClient } from "@/lib/authclient";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Controller, useForm } from 'react-hook-form'
import { registerUserSchema } from "@/validations/auth-validators";
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {

  const form = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  async function handleGoogleSignUp() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: '/dashboard'
    })
  }

  async function handleRegistrationForm(values: z.infer<typeof registerUserSchema>) {
    const validated = registerUserSchema.parse(values)
    const { data, error } = await authClient.signUp.email({
      name: validated.name,
      email: validated.email,
      image: '/assets/profile.webp',
      password: validated.password,
      callbackURL: '/dashboard'
    })

    if (data?.user) {
      toast.success('User Registered')
    } else {
      toast.error(error?.message)
    }
  }

  return (
    <div className="p-6 md:p-8 grid gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <form onSubmit={form.handleSubmit(handleRegistrationForm)} className="grid gap-3">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type={'password'} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input type={'password'} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button>Register</Button>
      </form>
      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        Or continue with
      </FieldSeparator>
      <div className="flex flex-row gap-2 items-center justify-center">
        <Button variant={'outline'} size={'icon'} onClick={() => handleGoogleSignUp()}>
          <FcGoogle className="size-5" />
        </Button>
        <Button variant={'outline'} size={'icon'}>
          <FaFacebook className="text-blue-600 size-5" />
        </Button>
      </div>
    </div>

  )
}

