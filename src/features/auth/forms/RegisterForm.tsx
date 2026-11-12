"use client";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema } from "../AuthSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterUserAction } from "../AuthActions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

export default function RegisterForm() {
  const router = useRouter();
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof RegisterSchema>) {
    const response = await RegisterUserAction(values);

    if (response.success) {
      toast.add({
        title: "Account Access",
        description: response.message,
      });
      router.push("/profile");
    } else {
      toast.add({
        title: "Account Access",
        description: response.message,
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleForm)}>
      <Card>
        <CardHeader>
          <CardTitle>Register an account</CardTitle>
          <CardDescription>
            Enter your email to register for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldContent>
                  <Input {...field} />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                  <Input {...field} />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                  <Input {...field} type="password" />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Confirm password</FieldLabel>
                <FieldContent>
                  <Input {...field} type="password" />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit">
            {form.formState.isSubmitting ? "Loggin In" : "Log In"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
