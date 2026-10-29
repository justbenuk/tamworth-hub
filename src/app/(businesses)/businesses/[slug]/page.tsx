import PageContainer from "@/components/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FetchBusinessBySlug } from "@/features/Business/BusinessActions";
import {
  ArrowRight,
  GlobeIcon,
  LocateIcon,
  Mail,
  MapIcon,
  PhoneIcon,
  PinIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BusinessDetailView({ params }: Props) {
  const { slug } = await params;

  const business = await FetchBusinessBySlug(slug);

  if (!business) return notFound();
  console.log(business);
  return (
    <PageContainer className="py-10" size="medium">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="grid gap-6">
            <h1>{business.name}</h1>
            <div className="flex flex-row items-center gap-1">
              <PinIcon className="text-primary" />
              <span>{business.addressLine1}</span>
              <span>{business.addressLine2}</span>
              <span>{business.town}</span>
              <span>{business.postcode}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
              {business.website && (
                <Button className="text-xl px-8 py-6">
                  <Link
                    href={`http://${business.website}`}
                    className="flex flex-row items-center gap-2"
                    target="_blank"
                  >
                    <GlobeIcon />
                    <span>Visit Website</span>
                  </Link>
                </Button>
              )}
              {business.postcode && (
                <Button variant={"secondary"} className="text-xl px-8 py-6">
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
                <Button className="text-xl px-8 py-6" variant={"secondary"}>
                  <Link
                    href={`tel://${business.phone}`}
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
            <div>gallery</div>
            <p className="text-lead">{business.description}</p>
          </div>
        </div>
        <aside className=" space-y-10">
          <div>
            <div className="grid gap-6 p-6 bg-neutral-100">
              <div>
                <h4>Opening Hours</h4>
              </div>
              <div className="space-y-2">
                <h4>Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {business.categories.map((cat) => (
                    <Badge variant={"default"} key={cat.categoryId}>
                      <Link
                        href={`/businesses/categories/${cat.category.slug}`}
                      >
                        {cat.category.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4>Share this business</h4>
                <p>coming Soon</p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-primary/20 space-y-3 p-6">
              <h4>Is this your business?</h4>
              <p>
                Claim your listing to update details, add photos and respond to
                reviews
              </p>
              <div>
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
            </div>
          </div>
        </aside>
      </div>
      <div className="my-20">
        <h2>Key Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 mt-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <div className="flex flex-col gap-8 font-semibold">
              <div className="flex flex-row items-center gap-6">
                <LocateIcon className="font-bold size-8" />
                <span className="text-xl">
                  {business.addressLine1} {business.addressLine2}{" "}
                  {business.town} {business.postcode}
                </span>
              </div>
              <div className="flex flex-row items-center gap-6">
                <PhoneIcon className="font-semibold size-8" />
                <span className="text-xl">{business.phone}</span>
              </div>
              <div className="flex flex-row items-center gap-6">
                <GlobeIcon className="font-semibold size-8" />
                <span className="text-xl">{business.website}</span>
              </div>
              <div className="flex flex-row gap-6">
                <Mail className="font-semibold size-8" />
                <span className="text-xl">{business.email}</span>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">opening times</div>
        </div>
      </div>
    </PageContainer>
  );
}
