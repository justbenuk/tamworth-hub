"use client";
import { ContactStatus, ContactType } from "@prisma/client/index-browser";
import { Controller, useForm } from "react-hook-form";
import { ContactSchema } from "../ContactSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "cn";
import { toast } from "sonner";
import { ContactFormAction } from "../ContactActions";

export default function MainContactForm({ mode }: { mode: ContactType }) {
  const showPageUrl = mode === ContactType.LISTING || mode === ContactType.BUG;

  const defaultValues = {
    type: mode,
    status: ContactStatus.NEW,
    name: "",
    email: "",
    subject: "",
    pageUrl: "",
    message: "",
  };

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof ContactSchema>) {
    const response = await ContactFormAction(values);

    if (response.success) {
      form.reset();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleForm)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${mode}-name`}>
                  Your name <span className="text-primary">*</span>
                </FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    id={`${mode}-name`}
                    placeholder="Enter your name"
                    required
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <div className="space-y-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${mode}-email`}>
                  Email Address <span className="text-primary">*</span>
                </FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    type="email"
                    id={`${mode}-email`}
                    placeholder="Enter your email address"
                    required
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </div>
      </div>

      <div className={cn("grid gap-5", showPageUrl && "sm:grid-cols-2")}>
        <div className="space-y-2">
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${mode}-subject`}>
                  Subject <span className="text-primary">*</span>
                </FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    id={`${mode}-subject`}
                    placeholder="What's your message about"
                    required
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </div>

        {showPageUrl && (
          <div className="space-y-2">
            <Controller
              name="pageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={`${mode}-pageUrl`}>
                    Page Url <span className="text-primary">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id={`${mode}-pageUrl`}
                      placeholder="What is the page URL"
                      required
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${mode}-message`}>
                Message <span className="text-primary">*</span>
              </FieldLabel>
              <FieldContent>
                <Textarea
                  {...field}
                  id={`${mode}-message`}
                  placeholder="Type your message here..."
                  rows={6}
                  required
                  className="min-h-36 resize-y rounded-sm"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-sm px-7 font-semibold"
      >
        Send message
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </form>
  );
}
