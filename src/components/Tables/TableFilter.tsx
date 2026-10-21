"use client";

import { Input } from "../ui/input";

export type TableFilterValue<TField extends string = string> = {
  field: TField | "";
  value: string;
};

type TableFilterProps<TField extends string> = {
  fields: readonly { value: TField; label: string }[];
  filter: TableFilterValue<TField>;
  setFilter: (filter: TableFilterValue<TField>) => void;
};

export default function TableFilter<TField extends string>({
  fields,
  filter,
  setFilter,
}: TableFilterProps<TField>) {
  return (
    <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
      <select
        aria-label="Filter field"
        className="h-8 rounded-none border border-input bg-background px-2.5 text-xs focus-visible:outline-ring"
        value={filter.field}
        onChange={(event) => {
          const field = fields.find((item) => item.value === event.target.value);
          setFilter({ field: field?.value ?? "", value: "" });
        }}
      >
        <option value="">No field filter</option>
        {fields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
      <Input
        type="search"
        aria-label="Filter value"
        placeholder="Filter by value..."
        disabled={!filter.field}
        value={filter.value}
        onChange={(event) => setFilter({ ...filter, value: event.target.value })}
      />
    </div>
  );
}
