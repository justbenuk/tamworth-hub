"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <NativeSelect value={theme} onChange={(e) => setTheme(e.target.value)}>
      <NativeSelectOption value={"dark"}>Dark</NativeSelectOption>
      <NativeSelectOption value={"light"}>Light</NativeSelectOption>
    </NativeSelect>
  );
}
