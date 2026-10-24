import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChartIcon,
  MessageCircleIcon,
  StarCheckIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageContainer className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 pb-10">
        <div className="col-span-1 lg:col-span-3 order-2 lg:order-1">
          <div className="pt-10 pb-5">
            <h1>
              About Tamworth <span className="text-primary">Hub</span>
            </h1>
            <p className="text-tagline">Your town, own community</p>
          </div>
          <p className="text-lead">
            Tamworth hub is a local and independent website, dedicated to
            bringing people together, celebrating our town and supporting the
            local community. We share the latest news, events, business
            listings, job opportunities and community stories across Tamworth.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-2 order-1 lg:order-2">
          <Image
            src={"/images/tamworth-castle.jpg"}
            alt="Tamworth Castle"
            width={600}
            height={600}
            loading="eager"
            className="h-70 w-full justify-self-end rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
        <Card>
          <CardContent className="space-y-3">
            <div className="flex flex-row items-start">
              <div className="bg-primary p-2 rounded-full text-white">
                <StarCheckIcon />
              </div>
            </div>
            <h4>Our Mission</h4>
            <p>
              To connect, inform and support, the people, businesses and
              organisations that make Tamworth a great place to live, work and
              visit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3">
            <div className="flex flex-row items-start">
              <div className="bg-primary p-2 rounded-full text-white">
                <UsersIcon />
              </div>
            </div>
            <h4>Our Community</h4>
            <p>
              We&apos;re here for local residents, businesses and charities and
              community groups, providing a free platform to share news, events
              and opportunities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3">
            <div className="flex flex-row items-start">
              <div className="bg-primary p-2 rounded-full text-white">
                <LineChartIcon />
              </div>
            </div>
            <h4>Our Future</h4>
            <p>
              We&apos;re continually developing Tamworth Hub with new features
              and content and we&apos;re excited to see how it can grow to
              support our community
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100/50">
        <Image
          src={"/images/tamworth-castle.jpg"}
          alt="Tamworth Castle"
          width={600}
          height={600}
          loading="eager"
          className="h-70 w-full justify-self-end rounded"
        />
        <div className="flex flex-col justify-center items-start space-y-4 p-10">
          <h2>Get in touch</h2>
          <p>
            Have a question or want to learn more about Tamworth Hub? We&apos;ed
            love to hear from you, We&apos;re also looking for ideas on how to
            improve the hub.
          </p>
          <Button size={"lg"} asChild>
            <Link href={"/contact"} className="flex flex-row gap-2">
              <MessageCircleIcon />
              <span>Contact Us</span>
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
