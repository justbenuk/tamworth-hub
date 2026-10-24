import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Newspaper,
  CalendarDays,
  Store,
  BriefcaseBusiness,
} from "lucide-react";
import MainHeader from "@/components/headers/MainHeader";
import Footer from "@/components/footers/Footer";
import SiteMenu from "@/components/Menus/SiteMenu";
import TopMenu from "@/components/Menus/TopMenu";

const destinations = [
  { label: "Latest news", href: "/news", icon: Newspaper },
  { label: "What's on", href: "/events", icon: CalendarDays },
  { label: "Local businesses", href: "/businesses", icon: Store },
  { label: "Local jobs", href: "/jobs", icon: BriefcaseBusiness },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <TopMenu />
        <MainHeader />
        <SiteMenu />
      </div>
      <main className="container-site py-12 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-category mb-5">TAMWORTH HUB / PAGE NOT FOUND</p>

            <div className="font-heading text-[clamp(8rem,22vw,17rem)] font-black leading-[0.75] tracking-[-0.06em] text-foreground">
              4<span className="text-primary">0</span>4
            </div>

            <div className="mt-10 h-1 w-16 bg-primary" />

            <h1 className="mt-6 max-w-xl font-heading text-4xl font-black leading-tight md:text-6xl">
              Looks like this story
              <br />
              has gone missing.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              We couldn&apos;t find the page you&apos;re looking for. It may
              have been moved, removed or the link might be incorrect.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex h-12 items-center gap-3 bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-brand-red-hover"
            >
              <ArrowLeft className="size-4" />
              Back to homepage
            </Link>
          </div>

          <aside className="border border-border bg-card">
            <div className="border-b-2 border-foreground p-6">
              <p className="text-category">KEEP EXPLORING</p>
              <h2 className="mt-2 font-heading text-3xl font-black">
                There&apos;s plenty happening in Tamworth.
              </h2>
            </div>

            <div className="divide-y divide-border">
              {destinations.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-muted"
                >
                  <Icon className="size-5 text-primary" />
                  <span className="flex-1 font-semibold">{label}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
