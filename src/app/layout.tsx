import type { Metadata } from "next";
import "./globals.css";
import { RootProps } from "@/types";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: '%s | Tamworth Hub',
    default: 'Tamworth Hub'
  },
  description: "A community portal for the poeple of Tamworth",
};

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
