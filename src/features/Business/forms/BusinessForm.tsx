"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaPicker from "@/features/media/MediaPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BusinessCategory, Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { AddBusiness, UpdateBusiness } from "../BusinessActions";
import { BusinessSchema } from "../BusinessSchema";
import CategoryMultiSelect from "../components/CategoryMultiSelect";

export type BusinessWithCategories = Prisma.BusinessGetPayload<{
  include: { categories: { select: { categoryId: true } } };
}>;

type BusinessProps =
  | {
      mode: "add";
      business?: never;
      categories: BusinessCategory[];
    }
  | {
      mode: "edit";
      business: BusinessWithCategories;
      categories: BusinessCategory[];
    };

export default function BusinessForm(props: BusinessProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const business = isEditing ? props.business : null;
  const categories = props.categories;

  const defaultValues = {
    name: business?.name ?? "",
    description: business?.description ?? "",
    image: business?.image ?? "",
    email: business?.email ?? undefined,
    phone: business?.phone ?? "",
    website: business?.website ?? "",
    addressLine1: business?.addressLine1 ?? "",
    addressLine2: business?.addressLine2 ?? "",
    town: business?.town ?? "",
    postcode: business?.postcode ?? "",
    categoryIds: business?.categories.map(({ categoryId }) => categoryId) ?? [],
    isFeatured: business?.isFeatured ?? false,
    isPublished: business?.isPublished ?? false,
  };

  const form = useForm<
    z.input<typeof BusinessSchema>,
    unknown,
    z.output<typeof BusinessSchema>
  >({
    resolver: zodResolver(BusinessSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof BusinessSchema>) {
    try {
      const response = isEditing
        ? await UpdateBusiness(props.business.id, values)
        : await AddBusiness(values);

      if (response.success) {
        toast.success(response.message);
        router.push("/admin/businesses");
        return;
      }
      toast.error(response.message);
    } catch {
      toast.error(
        isEditing ? "Failed to update business" : "Added new business",
      );
    }
  }

  return (
    <form className="grid gap-6" onSubmit={form.handleSubmit(handleForm)}>
      <h4>{isEditing ? `Edit ${business?.name}` : "New Business"}</h4>
      <Card>
        <CardHeader>
          <CardTitle>Cover Image</CardTitle>
        </CardHeader>
        <CardContent>
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Business Image"
                    height={1000}
                    width={1000}
                    className="h-auto w-full max-h-[30dvh]"
                  />
                ) : null}
                <div className="flex flex-row items-center justify-end gap-3">
                  <MediaPicker
                    onSelect={(media) => field.onChange(media.url)}
                    triggerLabel={
                      field.value ? "Change Cover Image" : "Add Cover Image"
                    }
                  />
                  {field.value && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange("")}
                    >
                      Remove Cover Image
                    </Button>
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
      </Card>
      <div className="grid ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>
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
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <FieldContent>
                        <Textarea {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="grid cols-1 lg:grid-cols-3 gap-6">
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
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Phone Number</FieldLabel>
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
                  name="website"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Website URL</FieldLabel>
                      <FieldContent>
                        <Input {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="grid cols-1 lg:grid-cols-2 gap-6">
                <Controller
                  name="addressLine1"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Address</FieldLabel>
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
                  name="addressLine2"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Address (Optional)</FieldLabel>
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
                  name="town"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Town</FieldLabel>
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
                  name="postcode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Post Code</FieldLabel>
                      <FieldContent>
                        <Input {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <aside className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="categoryIds"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <CategoryMultiSelect
                          categories={categories}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>
            {(
              [
                {
                  name: "isFeatured",
                  title: "Featured",
                  label: "Feature this business",
                },
                {
                  name: "isPublished",
                  title: "Published",
                  label: "Publish this business",
                },
              ] as const
            ).map(({ name, title, label }) => (
              <Card key={name}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name={name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={name}
                            name={field.name}
                            ref={field.ref}
                            checked={field.value}
                            onChange={(event) =>
                              field.onChange(event.target.checked)
                            }
                            onBlur={field.onBlur}
                            aria-invalid={fieldState.invalid}
                            className="size-4 accent-primary"
                          />
                          <FieldLabel htmlFor={name}>{label}</FieldLabel>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
            <Button>{isEditing ? "Update" : "Save"}</Button>
          </aside>
        </div>
      </div>
    </form>
  );
}
