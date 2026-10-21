"use client";

import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordSchema } from "../AuthintactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetPasswordAction } from "../AutenticationActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const defaultValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof ResetPasswordSchema>) {
    const response = await ResetPasswordAction(values, token);

    if (response.success) {
      toast.success(response.message);
      router.push("/login");
      router.refresh();
    } else {
      toast.error(response.message);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleForm)} className="grid gap-6">
      <div className="flex flex-col items-center gap-3">
        <Controller
          name="newPassword"
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
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </div>
      <div className="flex flex-row items-center justify-end">
        <Button>Reset</Button>
      </div>
    </form>
  );
}
