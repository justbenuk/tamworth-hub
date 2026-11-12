"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { Folder } from "@hugeicons/core-free-icons";
import { loadIcon } from "@hugeicons/core-free-icons/loader";
import { HugeiconsIcon } from "@hugeicons/react";

type IconData = ComponentProps<typeof HugeiconsIcon>["icon"];
type Props = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
  name: string | null | undefined;
};

export default function DatabaseIcon({ name, ...props }: Props) {
  const [icon, setIcon] = useState<IconData>(Folder);

  useEffect(() => {
    let active = true;
    setIcon(Folder);

    if (!name) return () => {
      active = false;
    };

    loadIcon(name)
      .then((loadedIcon) => {
        if (active) setIcon(loadedIcon);
      })
      .catch(() => {
        // Keep the fallback icon when the database contains an unknown name.
      });

    return () => {
      active = false;
    };
  }, [name]);

  return <HugeiconsIcon icon={icon} {...props} />;
}
