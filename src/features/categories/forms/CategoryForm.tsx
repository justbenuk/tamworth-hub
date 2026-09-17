"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, CategoryType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { CategorySchema } from "../CategorySchema";
import z from "zod";
import { AddCategory, EditCategory } from "../CategoryActions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusIcon } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryProps =
  | {
      mode: "add";
      category?: never;
    }
  | {
      mode: "edit";
      category: Category;
    };

export default function CategoryForm(props: CategoryProps) {
  const router = useRouter();
  const typeId = useId();
  const nameId = useId();
  const isEditing = props.mode === "edit";
  const category = isEditing ? props.category : null;

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      type: category?.type ?? CategoryType.UNCATEGORISED,
    },
  });

  async function handleSubmit(values: z.infer<typeof CategorySchema>) {
    try {
      const response =
        props.mode === "edit"
          ? await EditCategory(props.category.id, values)
          : await AddCategory(values);

      if (response.success) {
        toast.success(isEditing ? "Category Updated" : "Category Added");
        router.push("/portal/categories");
        router.refresh();
        return;
      }

      toast.error(response.message);
    } catch {
      toast.error(
        isEditing ? "failed to update category" : "Failed to add category",
      );
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isEditing ? "ghost" : "default"}>
          {isEditing ? <EditIcon className="text-yellow-500" /> : <PlusIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {isEditing ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogDescription>
          Enter a category name and choose its type.
        </DialogDescription>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={nameId}>Name</FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    id={nameId}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid ? `${nameId}-error` : undefined
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id={`${nameId}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={typeId}>Category Type</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      id={typeId}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? `${typeId}-error` : undefined
                      }
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a category type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(CategoryType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0) + type.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      id={`${typeId}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Saving…"
              : isEditing
                ? "Update Category"
                : "Add Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
