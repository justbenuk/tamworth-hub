import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  action: string;
  defaultValue?: string;
  placeholder?: string;
};

export function SearchForm({
  action,
  defaultValue = "",
  placeholder = "Search...",
}: Props) {
  return (
    <form action={action} method="GET" className="flex gap-2">
      <Input
        name="search"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      <Button type="submit">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}
