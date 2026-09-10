import { Input } from "../ui/input";

export default function TableSearch({
  title,
  search,
  setSearch,
}: {
  title: string;
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <Input
      placeholder={title}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
