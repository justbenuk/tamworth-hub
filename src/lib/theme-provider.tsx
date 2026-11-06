import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvder({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      disableTransitionOnChange
      defaultTheme="light"
      attribute={"class"}
    >
      {children}
    </NextThemeProvider>
  );
}
