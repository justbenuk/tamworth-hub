"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ward } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { WardSchema } from "../WordSchemas";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AddWardAction, EditWardAction } from "../WardActions";
import { toast } from "sonner";

const WardFormSchema = WardSchema.extend({
  geoJson: z
    .string()
    .transform((value, ctx) => {
      try {
        return JSON.parse(value) as unknown;
      } catch {
        ctx.addIssue({
          code: "custom",
          message: "Enter valid JSON.",
        });
        return z.NEVER;
      }
    })
    .pipe(WardSchema.shape.geoJson),
});

type WardProps =
  | {
      mode: "add";
      ward?: never;
    }
  | {
      mode: "edit";
      ward: Ward;
    };

export default function WardForm(props: WardProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const ward = isEditing ? props.ward : null;

  const defaultValues: z.input<typeof WardFormSchema> = {
    name: ward?.name ?? "",
    latitude: ward?.latitude ?? 0,
    longitude: ward?.longitude ?? 0,
    gss: ward?.gss ?? "",
    precision: ward?.precision ?? "",
    geoJson: ward ? JSON.stringify(ward.geoJson, null, 2) : "",
  };

  const form = useForm<
    z.input<typeof WardFormSchema>,
    unknown,
    z.output<typeof WardFormSchema>
  >({
    resolver: zodResolver(WardFormSchema),
    defaultValues,
  });

  async function handleSubmit(values: z.infer<typeof WardFormSchema>) {
    try {
      const response =
        props.mode === "edit"
          ? await EditWardAction(props.ward.id, values)
          : await AddWardAction(values);

      if (response.success) {
        toast.success(isEditing ? "Ward Updated" : "Ward Added");
        router.push("/portal/wards");
        router.refresh();
        return;
      }

      toast.error(response.message);
    } catch {
      toast.error(isEditing ? "Failed to update ward" : "Failed to add ward");
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-3">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="latitude"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Latitude</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                type="number"
                step="any"
                value={Number.isNaN(field.value) ? "" : field.value}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="longitude"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Longitude</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                type="number"
                step="any"
                value={Number.isNaN(field.value) ? "" : field.value}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="gss"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>GSS Code</FieldLabel>
            <FieldContent>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="precision"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Precision</FieldLabel>
            <FieldContent>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="geoJson"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="ward-geo-json">GeoJSON</FieldLabel>
            <FieldContent>
              <Textarea
                {...field}
                id="ward-geo-json"
                aria-invalid={fieldState.invalid}
                className="h-48 font-mono scroll-auto"
                spellCheck={false}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting
          ? "Saving…"
          : isEditing
            ? "Update Ward"
            : "Add Ward"}
      </Button>
    </form>
  );
}
