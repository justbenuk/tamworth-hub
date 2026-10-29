import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToString } from "react-dom/server";
import { FormProvider, useForm } from "react-hook-form";
import OpeningHoursField from "../src/features/OpeningHours/OpeningHoursField";
import type { OpeningHourInput } from "../src/features/OpeningHours/OpeningHourSchema";

function FormFixture() {
  const form = useForm<{ openingHours: OpeningHourInput[] }>({
    defaultValues: {
      openingHours: [
        { dayOfWeek: 1, openTime: "09:00", closeTime: "12:00" },
        { dayOfWeek: 1, openTime: "13:00", closeTime: "17:00" },
        { dayOfWeek: 0, openTime: "10:00", closeTime: "16:00" },
      ],
    },
  });
  return <FormProvider {...form}><OpeningHoursField /></FormProvider>;
}

test("opening-hours markup stays identical across independent initial renders", () => {
  const first = renderToString(<FormFixture />);
  const second = renderToString(<FormFixture />);
  assert.equal(first, second);
  const inputIds = [...first.matchAll(/id="([^"]+-(?:openTime|closeTime))"/g)].map((match) => match[1]);
  assert.equal(inputIds.length, 6);
  assert.equal(new Set(inputIds).size, 6);
  for (const id of inputIds) assert.ok(first.includes(`for="${id}"`));
});
