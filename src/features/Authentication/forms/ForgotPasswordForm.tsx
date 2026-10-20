"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "../AuthintactionSchema";
import { Button } from "@/components/ui/button";
import z from "zod";
import { ForgotPasswordAction } from "../AutenticationActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForm(values: z.infer<typeof ForgotPasswordSchema>) {
    const response = await ForgotPasswordAction(values);

    if (response.success) {
      toast.success(response.message);
      router.push("/");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleForm)}
      className="max-w-sm mx-auto space-y-4"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <div className="flex flex-row items-center justify-end">
        <Button disabled={form.formState.isLoading}>
          {form.formState.isSubmitting ? "Sending" : "Send reset link"}
        </Button>
      </div>
    </form>
  );
}
