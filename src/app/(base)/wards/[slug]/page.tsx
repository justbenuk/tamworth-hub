import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  ArrowLeftIcon,
  BriefcaseBusinessIcon,
  NewspaperIcon,
  ShieldAlertIcon,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FetchWardBySlug } from "@/features/wards/WardActions";

type WardPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: WardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ward = await FetchWardBySlug(slug)
  if (!ward) {
    return { title: "Ward not found" };
  }

  return {
    title: `${ward.name} Ward`,
    description: `Latest local news, crime information, jobs and councillors for ${ward.name} ward in Tamworth.`,
  };
}

export default async function WardPage({ params }: WardPageProps) {
  const { slug } = await params;
  const ward = await FetchWardBySlug(slug)

  if (!ward) {
    notFound();
  }

  return (
    <PageContainer size="medium" className="py-10">
      <div className="space-y-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/wards">
            <ArrowLeftIcon />
            Back to ward map
          </Link>
        </Button>

        <header className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Tamworth ward
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {ward.name}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Local information, representatives and the latest updates for the
            {` ${ward.name}`} ward.
          </p>
        </header>

        <section aria-labelledby="ward-updates-heading" className="space-y-4">
          <div>
            <h2 id="ward-updates-heading" className="text-2xl font-semibold">
              Latest updates
            </h2>
            <p className="text-sm text-muted-foreground">
              News, community safety information and opportunities in this ward.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <NewspaperIcon className="size-5 text-muted-foreground" />
                <CardTitle>Latest news</CardTitle>
                <CardDescription>
                  News and announcements for {ward.name}.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No ward news has been published yet.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlertIcon className="size-5 text-muted-foreground" />
                <CardTitle>Crime and safety</CardTitle>
                <CardDescription>
                  Recent crime and community safety information.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Crime information for this ward is not available yet.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BriefcaseBusinessIcon className="size-5 text-muted-foreground" />
                <CardTitle>Local jobs</CardTitle>
                <CardDescription>
                  Employment opportunities in and around {ward.name}.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No local jobs have been added yet.
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          aria-labelledby="ward-councillors-heading"
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <UsersIcon className="size-5 text-muted-foreground" />
            <h2
              id="ward-councillors-heading"
              className="text-2xl font-semibold"
            >
              Councillors
            </h2>
          </div>

          {ward.councillors.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ward.councillors.map((councillor) => (
                <Card key={councillor.id}>
                  <CardHeader></CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2 text-sm">
                    <div className="col-span-2 flex flex-col gap-1">
                      <span className="text-lg font-semibold">
                        {councillor.name}
                      </span>
                      <span>{councillor.party}</span>
                      <Link
                        href={`mailto:${councillor.email}`}
                        className="w-fit text-primary underline underline-offset-4"
                      >
                        <div></div>
                        {councillor.email}
                      </Link>
                      {councillor.contactNumber && (
                        <Link
                          href={`tel:${councillor.contactNumber}`}
                          className="w-fit text-primary underline underline-offset-4"
                        >
                          {councillor.contactNumber}
                        </Link>
                      )}
                    </div>
                    <Image
                      src={councillor.image.url}
                      alt={councillor.name}
                      height={300}
                      width={300}
                      className="aspect-square"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-sm text-muted-foreground">
                No published councillors are currently listed for this ward.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
