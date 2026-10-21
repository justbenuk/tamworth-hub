"use client";

import { Input } from "../ui/input";

type TableSearchProps = {
  title?: string;
  search: string;
  setSearch: (value: string) => void;
};

export default function TableSearch({
  title = "Search...",
  search,
  setSearch,
}: TableSearchProps) {
  return (
    <Input
      type="search"
      aria-label={title}
      placeholder={title}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
