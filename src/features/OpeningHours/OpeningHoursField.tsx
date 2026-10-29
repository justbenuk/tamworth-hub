"use client";

import { useId } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { OpeningHourInput } from "./OpeningHourSchema";

// Match JavaScript's day numbering and the schema defaults: Sunday = 0.
const days = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 },
];

type FormValues = {
  openingHours: OpeningHourInput[];
};

/** Use inside a FormProvider whose form contains an openingHours array. */
export default function OpeningHoursField({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const id = useId();
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "openingHours",
  });
  const isDisabled = disabled || isSubmitting;

  return (
    <FieldSet disabled={isDisabled}>
      <FieldLegend>Opening hours</FieldLegend>
      <FieldDescription>
        Enable the days you are open. Add multiple periods for split opening
        hours.
      </FieldDescription>
      <FieldGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] items-start gap-3">
        {days.map(({ label: day, value: dayOfWeek }) => {
          const periods = fields
            .map((field, index) => ({ field, index }))
            .filter(({ field }) => field.dayOfWeek === dayOfWeek);
          const isOpen = periods.length > 0;
          const switchId = `${id}-day-${dayOfWeek}`;

          return (
            <div key={dayOfWeek} className="min-w-0 space-y-3 rounded-lg border p-3">
              <Field orientation="horizontal">
                <Switch
                  id={switchId}
                  checked={isOpen}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      append(
                        { dayOfWeek, openTime: "09:00", closeTime: "17:00" },
                        { shouldFocus: false },
                      );
                    } else {
                      remove(periods.map(({ index }) => index));
                    }
                  }}
                />
                <FieldLabel htmlFor={switchId}>{day}</FieldLabel>
                <span className="ml-auto text-sm text-muted-foreground">
                  {isOpen ? "Open" : "Closed"}
                </span>
              </Field>

              {periods.map(({ field, index }, periodIndex) => (
                <div key={field.id} className="flex items-start gap-2">
                  <input
                    type="hidden"
                    {...register(`openingHours.${index}.dayOfWeek`, {
                      valueAsNumber: true,
                    })}
                  />
                  {(["openTime", "closeTime"] as const).map((time) => (
                    <Controller
                      key={time}
                      control={control}
                      name={`openingHours.${index}.${time}`}
                      render={({ field: timeField, fieldState }) => {
                        // Field-array IDs are random; use the field path for SSR-stable attributes.
                        const inputId = `${id}-openingHours-${index}-${time}`;
                        const errorId = `${inputId}-error`;
                        return (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="min-w-0 flex-1"
                          >
                            <FieldLabel htmlFor={inputId}>
                              {time === "openTime" ? "Opens" : "Closes"}
                              <span className="sr-only">
                                {" "}
                                on {day}, period {periodIndex + 1}
                              </span>
                            </FieldLabel>
                            <Input
                              {...timeField}
                              id={inputId}
                              type="time"
                              step={60}
                              disabled={isDisabled}
                              aria-invalid={fieldState.invalid}
                              aria-describedby={
                                fieldState.invalid ? errorId : undefined
                              }
                            />
                            <FieldError
                              id={errorId}
                              errors={[fieldState.error]}
                            />
                          </Field>
                        );
                      }}
                    />
                  ))}
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="mt-6 shrink-0"
                    disabled={isDisabled}
                    aria-label={`Remove ${day} period ${periodIndex + 1}`}
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              ))}

              {isOpen && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isDisabled}
                  aria-label={`Add ${day} period`}
                  onClick={() =>
                    append({ dayOfWeek, openTime: "13:00", closeTime: "17:00" })
                  }
                >
                  <PlusIcon className="size-4" />
                  Add period
                </Button>
              )}
            </div>
          );
        })}
      </FieldGroup>
      <FieldError errors={[errors.openingHours, errors.openingHours?.root]} />
    </FieldSet>
  );
}
