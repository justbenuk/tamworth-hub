"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { HugeiconsIcon } from "@hugeicons/react";
import { Check, ChevronsUpDown, X } from "@hugeicons/core-free-icons";

export type CategoryOption = {
  id: string;
  name: string;
  parentName?: string;
};

type Props = {
  categories: CategoryOption[];
  value?: string[];
  onChange?: (ids: string[]) => void;
};

export default function BusinessCategoryMultiSelect({
  categories,
  value: controlledValue,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const value = controlledValue ?? selectedIds;

  function toggle(id: string) {
    const nextValue = value.includes(id)
      ? value.filter((item) => item !== id)
      : [...value, id];

    if (controlledValue === undefined) setSelectedIds(nextValue);
    onChange?.(nextValue);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((id) => {
          const category = categories.find((item) => item.id === id);

          if (!category) return null;

          return (
            <Badge key={id} variant="secondary" className="gap-1">
              {category.name}

              <button
                type="button"
                aria-label={`Remove ${category.name}`}
                onClick={() => toggle(id)}
              >
                <HugeiconsIcon icon={X} />
              </button>
            </Badge>
          );
        })}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              role="combobox"
              variant={"outline"}
              aria-expanded={open}
              className="w-full justify-between"
            />
          }
        >
          {value.length
            ? `${value.length} categories selected`
            : "Select categories"}
          <HugeiconsIcon icon={ChevronsUpDown} />
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>

              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.id}
                    keywords={[category.name, category.parentName ?? ""]}
                    onSelect={() => toggle(category.id)}
                  >
                    <HugeiconsIcon
                      icon={Check}
                      className={
                        value.includes(category.id)
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    />
                    <div className="flex flex-col">
                      <span>{category.name}</span>
                      {category.parentName && (
                        <span className="text-xs text-muted-foreground">
                          {category.parentName}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
