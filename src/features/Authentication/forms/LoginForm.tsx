"use client";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { LoginSchema } from "../AuthintactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserAction } from "../AutenticationActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof LoginSchema>) {
    const response = await LoginUserAction(values);

    if (response.success) {
      toast.success(response.message);
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error(response.message);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleForm)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                <Input {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Button variant={"default"}>Login</Button>
        <FieldGroup className="flex flex-row justify-center">
          <FieldDescription>
            Forgot Password?{" "}
            <Link href={"/forgot-password"}>Reset Password</Link>
          </FieldDescription>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
