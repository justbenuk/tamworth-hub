"use client";

import { FolderIcon } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

function isIconName(name: string): name is IconName {
  return iconNames.some((iconName) => iconName === name);
}

export default function CategoryIcon({ name, size = 32 }: { name: string | null; size?: number }) {
  if (!name || !isIconName(name)) {
    return <FolderIcon size={size} className="shrink-0" />;
  }

  return (
    <DynamicIcon
      name={name}
      size={size}
      className="shrink-0"
      fallback={() => <FolderIcon size={size} className="shrink-0" />}
    />
  );
}
