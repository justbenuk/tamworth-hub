"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LoginUserSchema } from "../AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginUserAction } from "../AuthActions";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof LoginUserSchema>) {
    const response = await LoginUserAction(data);

    if (response.success) {
      toast.success(response.message);
      router.replace("/dashboard/profile");
      router.refresh();
    } else {
      toast.error("Failed to login user");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input {...field} />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input {...field} type="password" />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Button>Log In</Button>
    </form>
  );
}
