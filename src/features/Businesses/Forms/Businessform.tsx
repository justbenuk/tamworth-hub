"use client";

import { Button } from "@/components/ui/button";
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
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BusinessCategory, Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { AddBusinessAction, UpdateBusinessAction } from "../BusinessActions";
import { BusinessSchema } from "../BusinessSchema";
import { toast } from "@/components/ui/toast";
import Editor from "@/components/Editor/Editor";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import { UploadButton } from "@/lib/uploadthing";
import {
  Camera,
  CheckListIcon,
  Clock,
  List,
  Map,
} from "@hugeicons/core-free-icons";
import BusinessCategoryMultiSelect from "@/features/Categories/Components/BusinessCategoryMultiSelect";
import { User } from "better-auth";
import OpeningHoursField from "@/features/OpeningHours/OpeningHoursField";

type BusinessWithCategoriesData = Prisma.BusinessGetPayload<{
  include: {
    categories: {
      select: {
        categoryId: true;
      };
    };
    openingHours: true;
  };
}>;

export type BusinessWithCategories = Omit<
  BusinessWithCategoriesData,
  "latitude" | "longitude"
> & {
  latitude: number | null;
  longitude: number | null;
};

type BusinessProps =
  | {
      mode: "add";
      business?: never;
      categories: BusinessCategory[];
      user: User & { role?: string | null };
    }
  | {
      mode: "edit";
      business: BusinessWithCategories;
      categories: BusinessCategory[];
      user: User & { role?: string | null };
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
    email: business?.email ?? "",
    phone: business?.phone ?? "",
    website: business?.website ?? "",
    addressLine1: business?.addressLine1 ?? "",
    addressLine2: business?.addressLine2 ?? "",
    town: business?.town ?? "",
    postcode: business?.postcode ?? "",
    latitude:
      business?.latitude == null ? undefined : Number(business.latitude),
    longitude:
      business?.longitude == null ? undefined : Number(business.longitude),
    openingHours:
      business?.openingHours.map(({ dayOfWeek, openTime, closeTime }) => ({
        dayOfWeek,
        openTime,
        closeTime,
      })) ?? [],
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
        ? await UpdateBusinessAction(props.business.id, values)
        : await AddBusinessAction(values);

      if (response.success) {
        toast.add({
          title: "Business",
          description: response.message,
        });
        router.push("/dashboard/businesses");
        return;
      }
      toast.add({
        title: "Business",
        description: response.message,
      });
    } catch {
      toast.add({
        title: isEditing ? "Failed to update business" : "Added new business",
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="grid gap-6 pb-20"
        onSubmit={form.handleSubmit(handleForm, (errors) => {
          const firstError = Object.values(errors).find(
            (error) => error?.message,
          )?.message;
          toast.add({
            title: "Check the form",
            description:
              typeof firstError === "string"
                ? firstError
                : "Please check the highlighted fields.",
          });
        })}
      >
        <Card>
          <CardContent className="flex flex-row items-center gap-4 sm:gap-6">
            <Image
              src={props.business?.image || "/images/business-placeholder.svg"}
              alt="business image"
              width={500}
              height={500}
              className="size-20 shrink-0 rounded-lg border border-border/60 object-cover sm:size-24"
            />
            <CardHeader className="min-w-0 flex-1 gap-2 px-0">
              <div className="flex flex-col items-start justify-center gap-3">
                <CardTitle className="text-xl font-semibold tracking-tight break-words sm:text-2xl">
                  {props.business?.name || "Your Business Name"}
                </CardTitle>
                {props.business?.isPublished ? (
                  <Badge className="border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                    Published
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="px-2.5 py-1">
                    Not published
                  </Badge>
                )}
              </div>
            </CardHeader>
          </CardContent>
        </Card>

        <Tabs defaultValue="details" className="w-full min-w-0">
          <div className="w-full min-w-0">
            <TabsList className="w-full flex-col gap-1 border border-border/70 bg-white p-1.5 group-data-horizontal/tabs:h-auto lg:flex-row [&_[data-slot=tabs-trigger][data-state=active]]:bg-white [&_[data-slot=tabs-trigger][data-state=active]]:text-primary [&_[data-slot=tabs-trigger][data-state=active]]:border-primary">
              <TabsTrigger
                value="details"
                className="h-auto min-h-12 w-full justify-start gap-2.5 px-4 py-3 text-sm font-medium lg:w-auto lg:justify-center"
              >
                <HugeiconsIcon icon={List} />
                Business Details
              </TabsTrigger>

              <TabsTrigger
                value="contact"
                className="h-auto min-h-12 w-full justify-start gap-2.5 px-4 py-3 text-sm font-medium lg:w-auto lg:justify-center"
              >
                <HugeiconsIcon icon={Map} />
                Contact & Location
              </TabsTrigger>

              <TabsTrigger
                value="media"
                className="h-auto min-h-12 w-full justify-start gap-2.5 px-4 py-3 text-sm font-medium lg:w-auto lg:justify-center"
              >
                <HugeiconsIcon icon={Camera} />
                Media
              </TabsTrigger>

              <TabsTrigger
                value="hours"
                className="h-auto min-h-12 w-full justify-start gap-2.5 px-4 py-3 text-sm font-medium lg:w-auto lg:justify-center"
              >
                <HugeiconsIcon icon={Clock} />
                Opening Hours
              </TabsTrigger>

              <TabsTrigger
                value="additional"
                className="h-auto min-h-12 w-full justify-start gap-2.5 px-4 py-3 text-sm font-medium lg:w-auto lg:justify-center"
              >
                <HugeiconsIcon icon={CheckListIcon} />
                Additional Info
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="mt-4">
            <Card className="[--card-spacing:--spacing(6)]">
              <CardHeader className="border-b pb-5">
                <CardTitle className="text-lg font-semibold">
                  Business details
                </CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">
                  Tell people what you do and what makes your business special.
                </p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-8 text-sm lg:grid-cols-3 lg:gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Business name</FieldLabel>
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
                    name="categoryIds"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Categories</FieldLabel>
                        <FieldContent>
                          <BusinessCategoryMultiSelect
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
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Description</FieldLabel>
                        <FieldContent>
                          <Editor
                            value={field.value as string}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            className="h-full"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="self-start rounded-lg border border-border/70 bg-muted/20 p-4"
                    >
                      <FieldLabel>Cover image</FieldLabel>
                      <p className="text-sm leading-6 text-muted-foreground">
                        Choose a clear image that represents your business.
                      </p>
                      {field.value ? (
                        <Image
                          src={field.value}
                          alt="Business Image"
                          height={1000}
                          width={1000}
                          className="aspect-[4/3] w-full rounded-md object-cover"
                        />
                      ) : null}
                      <div className="flex flex-wrap items-center gap-3">
                        <UploadButton
                          endpoint="businessImageUploader"
                          onClientUploadComplete={(files) => {
                            const imageUrl = files[0]?.serverData?.url;
                            if (imageUrl) field.onChange(imageUrl);
                          }}
                          onUploadError={(error) => {
                            toast.add({
                              title: "Image upload failed",
                              description: error.message,
                            });
                          }}
                          appearance={{
                            allowedContent: "hidden",
                            button:
                              "!flex !h-9 !w-auto !items-center !justify-center !rounded-4xl !border !border-border !bg-input/30 !px-3 !text-sm !font-medium !whitespace-nowrap !text-foreground hover:!bg-input/50 hover:!text-foreground",
                          }}
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
          </TabsContent>

          <TabsContent value="contact" className="mt-4">
            <Card className="[--card-spacing:--spacing(6)]">
              <CardHeader className="border-b pb-5">
                <CardTitle className="text-lg font-semibold">
                  Contact &amp; location
                </CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">
                  Help customers find you and get in touch.
                </p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-8 text-sm lg:grid-cols-3 lg:gap-6">
                <div className="space-y-3">
                  <h1>Business Address</h1>
                  <Controller
                    name="addressLine1"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Street address</FieldLabel>
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
                        <FieldLabel>
                          Address line 2{" "}
                          <span className="font-normal text-muted-foreground">
                            (optional)
                          </span>
                        </FieldLabel>
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
                        <FieldLabel>Postcode</FieldLabel>
                        <FieldContent>
                          <Input {...field} />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                </div>
                <div className="space-y-3">
                  <h1>Map Location</h1>
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
                            value={field.value ?? ""}
                            onChange={(event) =>
                              field.onChange(
                                event.target.value === ""
                                  ? undefined
                                  : event.target.valueAsNumber,
                              )
                            }
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
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
                            value={field.value ?? ""}
                            onChange={(event) =>
                              field.onChange(
                                event.target.value === ""
                                  ? undefined
                                  : event.target.valueAsNumber,
                              )
                            }
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                </div>
                <div className="space-y-3">
                  <h1>Contact Information</h1>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Email</FieldLabel>
                        <FieldContent>
                          <Input {...field} value={field.value ?? ""} />
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
                        <FieldLabel>Phone number</FieldLabel>
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
                        <FieldLabel>Website</FieldLabel>
                        <FieldContent>
                          <Input {...field} placeholder="https://" />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="mt-4">
            <Card className="[--card-spacing:--spacing(6)]">
              <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                <HugeiconsIcon
                  icon={Camera}
                  className="size-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="text-lg font-semibold">Media gallery</h2>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  Gallery uploads are coming soon. You can add a cover image in
                  Business Details.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="mt-4">
            <Card className="[--card-spacing:--spacing(6)]">
              <CardHeader className="border-b pb-5">
                <CardTitle className="text-lg font-semibold">
                  Opening hours
                </CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">
                  Let customers know when they can visit.
                </p>
              </CardHeader>
              <CardContent className="text-sm">
                <OpeningHoursField />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="additional" className="mt-4">
            <Card className="[--card-spacing:--spacing(6)]">
              <CardHeader className="border-b pb-5">
                <CardTitle className="text-lg font-semibold">
                  Listing settings
                </CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">
                  Manage how this business appears in the directory.
                </p>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  {props.user.role === "admin" && (
                    <div className="grid gap-3">
                      <Card className="flex flex-row items-center justify-between ">
                        <CardHeader className="flex-1">
                          <CardTitle className="leading-1">Featured</CardTitle>
                          <CardDescription className="leading-2">
                            Feature this business
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Controller
                            name="isFeatured"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-3">
                                  <Input
                                    type="checkbox"
                                    id="isFeatured"
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
                                </div>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </CardContent>
                      </Card>
                      <Card className="flex flex-row items-center justify-between ">
                        <CardHeader className="flex-1">
                          <CardTitle className="leading-1">Published</CardTitle>
                          <CardDescription className="leading-2">
                            Publish this business
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Controller
                            name="isPublished"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    id="isPublished"
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
                                </div>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="border rounded-2xl p-6 bg-neutral-100">
                    <p>
                      All business listing are checked and can be removed at
                      anytime. Please make sure you only advertise the services
                      you do offer
                    </p>
                  </div>
                  <Button type="submit">Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </FormProvider>
  );
}
