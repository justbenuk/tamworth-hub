"use client";

import ImageUploadButton from "@/components/ImageUploadButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Prisma } from "@prisma/client";
import { EditIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  AddCouncillorAction,
  EditCouncillorAction,
  FetchAllWardsAction,
} from "../WardActions";
import { CouncillorSchema } from "../WordSchemas";

type CouncillorWithImage = Prisma.CouncillorGetPayload<{
  include: {
    image: true;
  };
}>;

type WardOption = Awaited<ReturnType<typeof FetchAllWardsAction>>[number];

type CouncillorProps =
  | {
      mode: "add";
      councillor?: never;
    }
  | {
      mode: "edit";
      councillor: CouncillorWithImage;
    };

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30";

export default function CouncillorForm(props: CouncillorProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const councillor = isEditing ? props.councillor : null;
  const [open, setOpen] = useState(false);
  const [wards, setWards] = useState<WardOption[]>([]);
  const [wardsError, setWardsError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    councillor?.image.url ?? null,
  );

  const defaultValues: z.input<typeof CouncillorSchema> = {
    name: councillor?.name ?? "",
    email: councillor?.email ?? "",
    imageId: councillor?.imageId ?? "",
    facebook: councillor?.facebook ?? "",
    twitter: councillor?.twitter ?? "",
    instagram: councillor?.instagram ?? "",
    linkedin: councillor?.linkedin ?? "",
    party: councillor?.party ?? "",
    contactNumber: councillor?.contactNumber ?? "",
    wardId: councillor?.wardId ?? "",
    published: councillor?.published ?? false,
  };

  const form = useForm<
    z.input<typeof CouncillorSchema>,
    unknown,
    z.output<typeof CouncillorSchema>
  >({
    resolver: zodResolver(CouncillorSchema),
    defaultValues,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadWards() {
      try {
        const availableWards = await FetchAllWardsAction();
        if (!cancelled) {
          setWards(availableWards);
          setWardsError(null);
        }
      } catch {
        if (!cancelled) {
          setWardsError("Unable to load wards.");
        }
      }
    }

    void loadWards();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(values: z.output<typeof CouncillorSchema>) {
    try {
      const response = isEditing
        ? await EditCouncillorAction(props.councillor.id, values)
        : await AddCouncillorAction(values);

      if (response.success) {
        toast.success(response.message);
        setOpen(false);
        form.reset(defaultValues);
        router.refresh();
        return;
      }

      toast.error(response.message);
    } catch {
      toast.error(
        isEditing ? "Failed to update councillor" : "Failed to add councillor",
      );
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      form.reset(defaultValues);
      setImagePreviewUrl(councillor?.image.url ?? null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={isEditing ? "icon-sm" : "icon"}
          aria-label={
            props.mode === "edit"
              ? `Edit ${props.councillor.name}`
              : "Add councillor"
          }
          variant={isEditing ? "ghost" : null}
        >
          {isEditing ? <EditIcon className="text-yellow-500" /> : <PlusIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-5">
          <DialogHeader>
            <DialogTitle>
              {props.mode === "edit"
                ? `Edit ${props.councillor.name}`
                : "Add Councillor"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-name">Name</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-name"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-email">Email</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="imageId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="sm:col-span-2">
                  <FieldLabel>Councillor image</FieldLabel>
                  <FieldContent>
                    <ImageUploadButton
                      endpoint="councillorImageUploader"
                      label={field.value ? "Replace image" : "Upload image"}
                      onUploadComplete={(files) => {
                        const uploadedImage = files[0];
                        if (!uploadedImage) return;

                        field.onChange(uploadedImage.id);
                        setImagePreviewUrl(uploadedImage.url);
                        toast.success("Image uploaded");
                      }}
                    />
                    {imagePreviewUrl && (
                      <a
                        href={imagePreviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit text-sm text-muted-foreground underline underline-offset-4"
                      >
                        View selected image
                      </a>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="wardId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-ward">Ward</FieldLabel>
                  <FieldContent>
                    <select
                      {...field}
                      id="councillor-ward"
                      className={selectClassName}
                      disabled={wards.length === 0}
                      aria-invalid={fieldState.invalid || Boolean(wardsError)}
                    >
                      <option value="">
                        {wards.length === 0
                          ? "Loading wards…"
                          : "Select a ward"}
                      </option>
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    {wardsError && <FieldError>{wardsError}</FieldError>}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="party"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-party">Party</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-party"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="contactNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-phone">
                    Contact Number
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="facebook"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-facebook">
                    Facebook
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-facebook"
                      type="url"
                      placeholder="https://facebook.com/…"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="twitter"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-twitter">Twitter</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-twitter"
                      type="url"
                      placeholder="https://x.com/…"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="instagram"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-instagram">
                    Instagram
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-instagram"
                      type="url"
                      placeholder="https://instagram.com/…"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="linkedin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="councillor-linkedin">
                    LinkedIn
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="councillor-linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/…"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="published"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  className="rounded-lg border p-3 sm:col-span-2"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="councillor-published">
                      Published
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Switch
                    id="councillor-published"
                    name={field.name}
                    ref={field.ref}
                    checked={field.value}
                    onBlur={field.onBlur}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving…"
                : isEditing
                  ? "Update Councillor"
                  : "Add Councillor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
