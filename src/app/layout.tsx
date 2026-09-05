import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | Tamworth Hub",
    default: "Tamworth Hub",
  },
  description:
    "What's happening in Tamworth, From Events to community groups everything you need in one place",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", dmSans.variable)}
      suppressHydrationWarning
    >
      <body>
        <main className="min-h-screen flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
