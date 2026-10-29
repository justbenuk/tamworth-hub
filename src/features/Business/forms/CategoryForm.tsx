"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { CategorySchema } from "../BusinessSchema";
import { AddCategory, UpdateCategory } from "../BusinessActions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { useId, useState } from "react";

type CategoryProps =
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

export default function CategoryForm(props: CategoryProps) {
  const activeId = useId();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const category = isEditing ? props.category : null;
  const categories = props.categories;

  const defaultValues = {
    name: category?.name ?? "",
    description: category?.description ?? "",
    icon: category?.icon ?? "",
    parentId: category?.parentId ?? undefined,
    sortOrder: category?.sortOrder ?? 0,
    isActive: category?.isActive ?? true,
  };

  const form = useForm<
    z.input<typeof CategorySchema>,
    unknown,
    z.output<typeof CategorySchema>
  >({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  async function handleForm(values: z.output<typeof CategorySchema>) {
    try {
      const response =
        props.mode === "edit"
          ? await UpdateCategory(props.category.id, values)
          : await AddCategory(values);

      if (response.success) {
        toast.success(response.message);
        form.reset();
        router.refresh();
        setOpen(false);
        return;
      }

      toast.error(response.message);
    } catch {
      toast.error(
        isEditing ? "Failed to update category" : "Failed to add category",
      );
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => {
      if (form.formState.isSubmitting) return;
      if (nextOpen) form.reset(defaultValues);
      setOpen(nextOpen);
    }}>
      <AlertDialogTrigger asChild>
        {isEditing ? (
          <Button variant={"ghost"} size={"icon"}>
            <PencilIcon />
          </Button>
        ) : (
          <Button className="flex flex-row items-center gap-2" size={"lg"}>
            <PlusIcon />
            <span>Category</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          {isEditing ? `Edit ${props.category.name}` : "Add new category"}
        </AlertDialogTitle>
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
                    Icons or used from{" "}
                    <Link
                      href={"https://lucide.dev/icons/"}
                      target="_blank"
                      className="underline text-primary"
                    >
                      Lucid Icons
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Parent Category</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value ?? "none"}
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

                      {categories.filter((item) => item.id !== category?.id).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      onChange={(event) => field.onChange(event.target.valueAsNumber)}
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
                  <FieldLabel htmlFor={activeId}>Active</FieldLabel>
                  <FieldContent>
                    <Toggle
                      id={activeId}
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
            <AlertDialogCancel type="button" disabled={form.formState.isSubmitting}>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving…" : "Save category"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
