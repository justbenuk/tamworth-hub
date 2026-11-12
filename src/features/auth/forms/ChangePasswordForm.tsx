"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ChangePasswordSchema } from "../AuthSchema";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangePassworAction } from "../AuthActions";
import { toast } from "@/components/ui/toast";

export default function ChangePasswordForm() {
  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof ChangePasswordSchema>) {
    const response = await ChangePassworAction(values);

    if (response.success) {
      toast.add({
        description: response.message,
      });
      form.reset();
    } else {
      toast.add({
        description: response.message,
      });
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(handleForm)}
      className="grid space-y-6 mt-6"
    >
      <Controller
        name="currentPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Current Password</FieldLabel>
            <FieldContent>
              <Input {...field} type="password" />
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="newPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <FieldContent>
              <Input {...field} type="password" />
            </FieldContent>
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
            <FieldContent>
              <Input {...field} type="password" />
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-row items-center justify-end">
        <Button type="submit">
          {form.formState.isSubmitting
            ? "Changing Password"
            : "Change Password"}
        </Button>
      </div>
    </form>
  );
}
