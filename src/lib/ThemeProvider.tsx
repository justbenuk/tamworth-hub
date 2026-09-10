"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute={"class"}
    >
      {children}
    </NextThemeProvider>
  );
}
