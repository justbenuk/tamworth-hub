import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import localFont from "next/font/local";

const barlow = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-SemiBold.ttf", weight: "600" },
    { path: "./fonts/BarlowCondensed-Bold.ttf", weight: "700" },
    { path: "./fonts/BarlowCondensed-ExtraBold.ttf", weight: "800" },
    { path: "./fonts/BarlowCondensed-Black.ttf", weight: "900" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter-Variable.ttf",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const caveat = localFont({
  src: "./fonts/Caveat-Variable.ttf",
  variable: "--font-caveat",
  weight: "600 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s ˘| Tamworth Hub",
    default: "Tamworth Hub",
  },
  description:
    "Tamworth Hub is a community 1st platform for local businesses, charitys and community news and events",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${inter.variable} ${caveat.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
