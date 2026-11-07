"use client";

import { BusinessCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BusinessCategorySchema } from "../CategoriesSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import {
  AddBusinessCategory,
  UpdateBusinessCategory,
} from "../CategoriesAction";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon, Pencil } from "@hugeicons/core-free-icons";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";

type BusinessCategoryProps =
  | {
      mode: "add";
      category?: never;
      categories: BusinessCategory[];
    }
  | {
      mode: "edit";
      category: BusinessCategory;
      categories: BusinessCategory[];
    };

export default function BusinessCategoryForm(props: BusinessCategoryProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const category = isEditing ? props.category : null;
  const categories = props.categories;
  const parentCategoryOptions = categories
    .filter((item) => item.id !== category?.id)
    .map((item) => ({ value: item.id, label: item.name }));
  const parentCategoryItems = [
    { value: "none", label: "None (Top-Level Category)" },
    ...parentCategoryOptions,
  ];

  const defaultValues = {
    name: category?.name ?? "",
    description: category?.description ?? "",
    icon: category?.icon ?? "",
    parentId: category?.parentId ?? undefined,
    sortOrder: category?.sortOrder ?? 0,
    isActive: category?.isActive ?? true,
  };

  const form = useForm<
    z.input<typeof BusinessCategorySchema>,
    unknown,
    z.output<typeof BusinessCategorySchema>
  >({
    resolver: zodResolver(BusinessCategorySchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof BusinessCategorySchema>) {
    try {
      const response = isEditing
        ? await UpdateBusinessCategory(props.category.id, values)
        : await AddBusinessCategory(values);

      if (response.success) {
        toast.add({
          title: "Category",
          description: response.message,
        });
        form.reset();
        router.refresh();
        setOpen(false);
        return;
      }

      toast.add({
        title: "Category",
        description: response.message,
      });
    } catch {
      toast.add({
        description: isEditing
          ? "Failed to update category"
          : "Failed to add category",
      });
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button />}>
        {isEditing ? <span>edit</span> : <span>Add</span>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={form.handleSubmit(handleForm)} className="grid gap-3">
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
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="icon"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Icon</FieldLabel>
                <FieldContent>
                  <Input {...field} />
                  <FieldDescription>
                    Icons are used from{" "}
                    <Link
                      href={"https://hugeicons.com/icons/stroke-rounded"}
                      target="_blank"
                      className="underline text-primary"
                    >
                      Hugeicons
                    </Link>
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="parentId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Parent Category</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value ?? "none"}
                    items={parentCategoryItems}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? undefined : value)
                    }
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      ref={field.ref}
                      onBlur={field.onBlur}
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a parent category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">
                        None (Top-Level Category)
                      </SelectItem>

                      {parentCategoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>{" "}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="sortOrder"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Sort Order</FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      step={1}
                      {...field}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />{" "}
            <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Active</FieldLabel>
                  <FieldContent>
                    <Toggle
                      type="button"
                      ref={field.ref}
                      name={field.name}
                      pressed={field.value ?? true}
                      onPressedChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      aria-invalid={fieldState.invalid}
                      aria-label="Category active"
                      variant="outline"
                    >
                      {field.value ? "Active" : "Inactive"}
                    </Toggle>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              type="button"
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </AlertDialogCancel>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving…" : "Save category"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
