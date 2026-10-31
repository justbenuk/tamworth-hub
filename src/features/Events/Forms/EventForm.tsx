'use client'

import { Event } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { format } from "date-fns"
import { EventsSchema } from "../EventsSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { AddEvent, UpdateEvent } from "../EventsActions"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import Image from "next/image"
import MediaPicker from "@/features/media/MediaPicker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Editor from "@/components/Editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { eventCategoryOptions } from "../EventCategoryLabels"
import type { auth } from "@/lib/auth";


type User = typeof auth.$Infer.Session.user;

type EventProps =
  | {
    mode: 'add',
    event?: never,
    user: User
  }
  | {
    mode: 'edit',
    event: Event,
    user: User
  }

export default function EventForm(props: EventProps) {
  const router = useRouter()
  const isEditing = props.mode === 'edit'
  const event = isEditing ? props.event : null
  const user = props.user

  const defaultValues = {
    title: event?.title ?? "",
    description: event?.description ?? "",
    image: event?.image ?? "",
    category: event?.category,
    startDate: event?.startDate ? format(event.startDate, "yyyy-MM-dd'T'HH:mm") : "",
    endDate: event?.endDate ? format(event.endDate, "yyyy-MM-dd'T'HH:mm") : "",
    venue: event?.venue ?? "",
    address: event?.address ?? "",
    postcode: event?.postcode ?? "",
    organiser: event?.organiser ?? "",
    websiteUrl: event?.websiteUrl ?? "",
    isFeatured: event?.isFeatured ?? false,
    isFree: event?.isFree ?? false,
    price: event?.price ?? "",
    status: event?.status ?? 'DRAFT'
  }

  const form = useForm<z.input<typeof EventsSchema>, unknown, z.output<typeof EventsSchema>>({
    resolver: zodResolver(EventsSchema),
    defaultValues
  })

  async function handleForm(values: z.infer<typeof EventsSchema>) {
    try {
      const response = isEditing
        ? await UpdateEvent(props.event.id, values)
        : await AddEvent(values)

      if (response.success) {
        toast.success(response.message)
        router.push('/admin/events')
        return
      }
      toast.error(response.message)
    } catch {
      toast.error(
        isEditing ? 'Failed to update event' : 'Failed to add new event'
      )
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleForm, () => toast.error('Check the highlighted fields before saving'))}
        className="grid gap-6"
      >
        <h4>{isEditing ? `Edit ${props.event.title}` : 'New Event'}</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-3 lg:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller name="image" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    {field.value ? (
                      <Image src={field.value} alt="Event Image" height={1000} width={1000} />
                    ) : null}
                    <div className="flex flex-row items-center justify-end gap-3">
                      <MediaPicker
                        onSelect={(media) => field.onChange(media.url)}
                        triggerLabel={
                          field.value
                            ? 'Change cover image'
                            : 'Add cover image'
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
                )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <FieldContent>
                        <Editor value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} />
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
                <CardTitle>Where</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <Controller name="venue" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Venue</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
                <Controller name="address" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Address</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
                <Controller name="postcode" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>PostCode</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>When</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {([
                  { name: 'startDate', label: 'Start date and time' },
                  { name: 'endDate', label: 'End date and time' },
                ] as const).map(({ name, label }) => (
                  <Controller
                    key={name}
                    name={name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={name}>{label}</FieldLabel>
                        <FieldContent>
                          <Input
                            {...field}
                            id={name}
                            type="datetime-local"
                            value={field.value as string}
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.invalid ? `${name}-error` : undefined}
                          />
                          {fieldState.invalid && (
                            <FieldError id={`${name}-error`} errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Controller name="category" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldContent>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ''}
                      >
                        <SelectTrigger ref={field.ref} onBlur={field.onBlur} aria-label="Event category" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>

                        <SelectContent>
                          {eventCategoryOptions.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Organiser</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Controller name="organiser" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Organiser</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
                <Controller name="websiteUrl" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Website Url</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cost</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Controller name="isFree" control={form.control} render={({ field, fieldState }) => (
                  <Field className="flex flex-row">
                    <FieldLabel>Is Free</FieldLabel>
                    <FieldContent>
                      <input
                        type="checkbox"
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
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
                <Controller name="price" control={form.control} render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <FieldContent>
                      <Input {...field} placeholder="£" />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )} />
              </CardContent>
            </Card>
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle>Featured</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <Controller name="isFeatured" control={form.control} render={({ field, fieldState }) => (
                    <Field className="flex flex-row">
                      <FieldLabel>Feature Event</FieldLabel>
                      <FieldContent>
                        <input
                          type="checkbox"
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
                      </FieldContent>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )} />
                </CardContent>
              </Card>
            )}
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting ? 'Submitting…' : isEditing ? 'Update Event' : 'Save Event'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider >
  )
}

