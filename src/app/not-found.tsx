import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import TopHeader from "@/components/Headers/TopHeader";
import MainMenu from "@/components/Menus/MainMenu";
import PageContainer from "@/components/Page/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  List,
  Newspaper,
  PartyFreeIcons,
  Shop,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const destinations = [
  { label: "Latest news", href: "/news", icon: Newspaper },
  { label: "What's on", href: "/events", icon: PartyFreeIcons },
  { label: "Local businesses", href: "/businesses", icon: Shop },
  { label: "Local jobs", href: "/jobs", icon: List },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col -center justify-between">
      <div className="border-b">
        <TopHeader />
        <MainHeader />
        <MainMenu />
      </div>
      <PageContainer size="medium">
        <main className="container-site py-12 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 font-semibold text-primary">
                TAMWORTH HUB / PAGE NOT FOUND
              </p>
              <div className="font-heading text-[clamp(8rem,22vw,17rem)] font-black leading-[0.75] tracking-[-0.06em] text-foreground">
                4<span className="text-primary">0</span>4
              </div>
              <div className="mt-10 h-1 w-16 bg-primary" />
              <h1 className="mt-6 max-w-xl font-heading text-4xl font-black leading-tight md:text-6xl">
                Looks like this page
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
                <HugeiconsIcon icon={ArrowLeft} />
                Back Home
              </Link>
            </div>

            <aside className="border border-border bg-card">
              <Card>
                <CardHeader>
                  <CardDescription className="text-primary font-semibold">
                    KEEP EXPLORING
                  </CardDescription>
                  <CardTitle className="text-4xl font-semibold">
                    There&apos;s plenty happening in{" "}
                    <span className="text-primary">Tamworth</span>.
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-border">
                    {destinations.map(({ label, href, icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className="group flex items-center gap-4 -6 py-5 transition-colors hover:bg-muted"
                      >
                        <span className="flex-1 font-semibold">{label}</span>
                        <HugeiconsIcon
                          icon={icon}
                          className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                        />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>{" "}
      </PageContainer>
      <MainFooter />
    </div>
  );
}
