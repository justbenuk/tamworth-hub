import PageContainer from "@/components/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FetchBusinessBySlug } from "@/features/Business/BusinessActions";
import {
  ArrowRight,
  GlobeIcon,
  ListIcon,
  LocateIcon,
  Mail,
  MapIcon,
  PhoneIcon,
  PinIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, KeyIcon } from "lucide-react";
import { OpeningHours } from "@/features/OpeningHours/OpeningHours";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditorContent from "@/components/EditorContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BusinessDetailView({ params }: Props) {
  const { slug } = await params;

  const business = await FetchBusinessBySlug(slug);

  if (!business) return notFound();
  return (
    <PageContainer className="py-10" size="medium">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 grid gap-6">
          <div className="grid gap-6">
            <h1>{business.name}</h1>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1">
              <PinIcon className="hidden lg:block text-primary" />
              <span>{business.addressLine1}</span>
              <span>{business.addressLine2}</span>
              <span>{business.town}</span>
              <span>{business.postcode}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
              {business.website && (
                <Button className=" px-8 py-6">
                  <Link
                    href={`http://${business.website as string}`}
                    className="flex flex-row items-center gap-2"
                    target="_blank"
                  >
                    <GlobeIcon />
                    <span>Visit Website</span>
                  </Link>
                </Button>
              )}
              {business.postcode && (
                <Button variant={"secondary"} className="px-8 py-6">
                  <Link
                    href={`https://www.google.com/maps/place/${business.postcode}`}
                    target="_blank"
                    className="flex flex-row items-center gap-2"
                  >
                    <MapIcon />
                    <span>Get Directions</span>
                  </Link>
                </Button>
              )}
              {business.phone && (
                <Button className="px-8 py-6" variant={"secondary"}>
                  <Link
                    href={`tel://${business.phone as string}`}
                    className="flex flex-row items-center gap-2"
                  >
                    <PhoneIcon />
                    <span>Call Now</span>
                  </Link>
                </Button>
              )}
            </div>
            <div>
              <Image
                src={business.image as string}
                alt={business.name}
                width={1000}
                height={1000}
                className="w-full"
              />
            </div>
            <EditorContent content={business.description as string} />
          </div>
          <Card>
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Key Information</CardTitle>
              <KeyIcon />
            </CardHeader>
            <CardContent>
              <Table className="p-0">
                <TableBody className="p-0">
                  <TableRow className="even:bg-muted/50 hover:bg-muted/70">
                    <TableCell>
                      <LocateIcon className="size-6" />
                    </TableCell>
                    <TableCell className="w-full text-lg">
                      {business.addressLine1} {business.addressLine2}{" "}
                      {business.town} {business.postcode}
                    </TableCell>
                  </TableRow>
                  <TableRow className="even:bg-muted/50 hover:bg-muted/70">
                    <TableCell>
                      <PhoneIcon className="size-6" />
                    </TableCell>
                    <TableCell className="w-full text-lg">
                      {business.phone}
                    </TableCell>
                  </TableRow>
                  <TableRow className="even:bg-muted/50 hover:bg-muted/70">
                    <TableCell>
                      <GlobeIcon className="size-6" />
                    </TableCell>
                    <TableCell className="w-full text-lg">
                      {business.website}
                    </TableCell>
                  </TableRow>
                  <TableRow className="even:bg-muted/50 hover:bg-muted/70">
                    <TableCell>
                      <Mail className="size-6" />
                    </TableCell>
                    <TableCell className="w-full text-lg">
                      {business.email}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>
        <aside className="grid gap-6">
          <Card>
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Opening Hours</CardTitle>
              <div>
                <Clock />
              </div>
            </CardHeader>
            <CardContent>
              <OpeningHours hours={business.openingHours} />
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Categories</CardTitle>
              <ListIcon />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {business.categories.map((cat) => (
                <Badge variant={"default"} key={cat.categoryId}>
                  <Link href={`/businesses/categories/${cat.category.slug}`}>
                    {cat.category.name}
                  </Link>
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Share this business</CardTitle>
              <UsersIcon />
            </CardHeader>
            <CardContent>coming Soon</CardContent>
          </Card>
          <div>
            <Card className="bg-red-500/30">
              <CardHeader>
                <CardTitle className="text-xl">Is this your business</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <p>
                    Claim your listing to update details, add photos and respond
                    to reviews
                  </p>
                  <Button
                    variant={"outline"}
                    className="border-2 border-primary w-full py-6 bg-transparent"
                  >
                    <Link
                      href={"/"}
                      className="flex flex-row items-center gap-3 text-primary font-bold"
                    >
                      <span>Claim this business</span>
                      <ArrowRight className="size-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
