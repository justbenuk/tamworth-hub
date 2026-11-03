import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tamworthweb.co.uk"),
  applicationName: "Tamworth Hub",
  title: {
    default: "Tamworth Hub | Your Local Community",
    template: "%s | Tamworth Hub",
  },
  description:
    "Discover local businesses, jobs, events, charities, news and community organisations in Tamworth, Staffordshire.",
  keywords: [
    "Tamworth",
    "Tamworth Staffordshire",
    "Tamworth businesses",
    "Tamworth events",
    "Tamworth jobs",
    "Tamworth community",
    "Tamworth Hub",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Tamworth Hub",
    title: "Tamworth Hub | Your Local Community",
    description:
      "Your local guide to businesses, jobs, events and community life in Tamworth.",
    url: "https://www.tamworthhub.co.uk",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tamworth Hub - Your Local Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "community",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
