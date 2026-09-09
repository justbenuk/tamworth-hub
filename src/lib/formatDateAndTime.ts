import type { ValueFormatterParams } from "ag-grid-community";
export function formatDateAndTime({ value }: ValueFormatterParams<string>) {
  return value?.toLocaleString("en-GB") ?? "";
}
