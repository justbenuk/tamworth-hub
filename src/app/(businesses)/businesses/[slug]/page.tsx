import EditorContent from "@/components/Editor/EditorContent";
import BusinessMapContainer from "@/components/Maps/BusinessMapContainer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchBusinessBySlugAction } from "@/features/Businesses/BusinessActions";
import CategoryIcon from "@/features/Categories/Components/CategoryIcon";
import { OpeningHours } from "@/features/OpeningHours/OpeningHours";
import {
  ArrowUpRight,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const business = await FetchBusinessBySlugAction(slug);
  if (!business) {
    notFound();
  }

  const title = `${business.name} in Tamworth`;
  const description =
    business.description?.trim().slice(0, 155) ||
    `Discover ${business.name} in Tamworth. Find business information, opening hours and contact details on Tamworth Hub.`;

  const url = `/businesses/${business.slug}`;

  return {
    title: {
      absolute: `${title} | Tamworth Hub`,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Tamworth Hub",
      type: "website",
      locale: "en_GB",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SingleBusinessPage({ params }: Props) {
  const { slug } = await params;

  const business = await FetchBusinessBySlugAction(slug);
  const longitude = business.longitude?.toNumber() ?? null;
  const latitude = business.latitude?.toNumber() ?? null;
  const hasCoordinates =
    latitude !== null &&
    longitude !== null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);
  const address = [
    business.addressLine1,
    business.addressLine2,
    business.town,
    business.postcode,
  ].filter(Boolean);
  const website = business.website
    ? /^https?:\/\//i.test(business.website)
      ? business.website
      : `https://${business.website}`
    : null;

  return (
    <main className="w-full min-w-0 py-5 sm:py-8 lg:py-12">
      <div className="mb-5 flex min-w-0 items-center gap-2 text-sm text-muted-foreground sm:mb-6">
        <Link
          href="/businesses"
          className="transition-colors hover:text-foreground"
        >
          Businesses
        </Link>
        <span aria-hidden="true">/</span>
        <span className="truncate text-foreground">{business.name}</span>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
        <div className="min-w-0">
          <header className="relative isolate flex min-h-60 flex-col justify-end overflow-hidden rounded-2xl border bg-muted p-4 sm:min-h-80 sm:rounded-3xl sm:p-8 lg:p-10">
            {business.image ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: `url("${business.image}")` }}
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-linear-to-br from-primary/20 via-muted to-background"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/35 to-black/5"
            />
            <div className="mb-auto flex flex-wrap gap-2">
              {business.isFeatured && (
                <Badge className="gap-1.5 border-white/20 bg-white/15 text-white backdrop-blur-md">
                  <Sparkles aria-hidden="true" className="size-3.5" />
                  Featured
                </Badge>
              )}
              {business.categories.map(({ category }) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="gap-1.5 border-white/20 bg-white/90 text-foreground backdrop-blur-md"
                >
                  <CategoryIcon name={category.icon as string} />
                  {category.name}
                </Badge>
              ))}
            </div>

            <div className="min-w-0 max-w-3xl text-white">
              <p className="mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-medium text-white/80">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                {business.town || "Tamworth"}
                {business.postcode ? ` · ${business.postcode}` : ""}
              </p>
              <h1 className="wrap-break-word text-[clamp(2rem,9vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {business.name}
              </h1>
            </div>
          </header>

          <div className="mt-6 grid min-w-0 gap-6 sm:mt-8 sm:gap-8 xl:grid-cols-[minmax(0,1fr)_17rem]">
            <section aria-labelledby="about-heading" className="min-w-0">
              <h2
                id="about-heading"
                className="text-xl font-semibold tracking-tight"
              >
                About
              </h2>
              {business.description ? (
                <EditorContent
                  content={business.description}
                  className="mt-4 leading-7 text-muted-foreground"
                />
              ) : (
                <p className="mt-4 text-muted-foreground">
                  More information about this business is coming soon.
                </p>
              )}
            </section>

            <section aria-labelledby="contact-heading">
              <h2
                id="contact-heading"
                className="text-xl font-semibold tracking-tight xl:sr-only"
              >
                Get in touch
              </h2>
              <div className="mt-3 space-y-2 xl:mt-0">
                {business.phone && (
                  <a
                    href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
                    className="group flex min-w-0 items-center gap-2.5 rounded-2xl border bg-card p-3 transition-colors hover:bg-muted sm:gap-3 sm:p-3.5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">
                        Call
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {business.phone}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="group flex min-w-0 items-center gap-2.5 rounded-2xl border bg-card p-3 transition-colors hover:bg-muted sm:gap-3 sm:p-3.5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">
                        Email
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {business.email}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-4 shrink-0 text-muted-foreground"
                    />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-w-0 items-center gap-2.5 rounded-2xl border bg-card p-3 transition-colors hover:bg-muted sm:gap-3 sm:p-3.5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Globe2 aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">
                        Website
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {business.website?.replace(/^https?:\/\//i, "")}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-4 shrink-0 text-muted-foreground"
                    />
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>

        <aside className="min-w-0 space-y-4 sm:space-y-5 lg:sticky lg:top-6">
          {hasCoordinates && (
            <BusinessMapContainer long={longitude} lat={latitude} />
          )}

          {address.length > 0 && (
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin aria-hidden="true" className="size-4 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <address className="space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
                  {address.map((line, index) => (
                    <div key={`${line}-${index}`}>{line}</div>
                  ))}
                </address>
              </CardContent>
            </Card>
          )}

          {business.openingHours.length > 0 && (
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock3 aria-hidden="true" className="size-4 text-primary" />
                  Opening hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OpeningHours hours={business.openingHours} />
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </main>
  );
}
