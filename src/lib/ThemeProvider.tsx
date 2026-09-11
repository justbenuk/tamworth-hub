"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute={"class"}
      scriptProps={{
        // Run the initial theme script in server HTML only. Client updates use effects.
        // Workaround for https://github.com/pacocoursey/next-themes/issues/387.
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
      }}
    >
      {children}
    </NextThemeProvider>
  );
}
