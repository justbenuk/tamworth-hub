"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ChangePasswordSchema } from "../ProfileSchema";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangePasswordAction } from "../ProfileActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function handlePasswordChange(
    data: z.infer<typeof ChangePasswordSchema>,
  ) {
    const response = await ChangePasswordAction(data);

    if (response.success) {
      toast.success(response.message);
      form.reset();
      router.refresh();
    } else {
      toast.error("Failed to change password");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handlePasswordChange)}
      className="grid gap-3 mt-3"
      id="changePassword"
    >
      <div className="flex flex-row items-center justify-evenly gap-10">
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Current Password</FieldLabel>
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
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>New Password</FieldLabel>
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
      <div className="flex flex-row justify-end items-center">
        <Button type="submit" form="changePassword">
          Change
        </Button>
      </div>
    </form>
  );
}
