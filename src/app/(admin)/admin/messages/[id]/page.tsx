import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetContactSubmisionById } from "@/features/Contact/ContactActions";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetailMessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params;

  const response = await GetContactSubmisionById(id);

  if (!response) return notFound();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-end">
        <Button>
          <Link
            href={"/admin/messages"}
            className="flex flex-row items-center gap-4"
          >
            <ArrowLeft />
            <span>Back</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Message Content</CardTitle>
            <CardDescription>Subject: {response.subject}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{response.message}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="border-b flex flex-row items-center justify-between">
                <span className="font-semibold">Submission Type: </span>
                <span>{response.type}</span>
              </div>
              <div className="border-b flex flex-row items-center justify-between">
                <span className="font-semibold">Name: </span>
                <span>{response.name}</span>
              </div>
              <div className="border-b flex flex-row items-center justify-between">
                <span className="font-semibold">Email: </span>
                <span>
                  <Link
                    href={`mailto://${response.email}`}
                    target="_blank"
                    className="underline"
                  >
                    {response.email}
                  </Link>
                </span>
              </div>
              <div className="border-b flex flex-row items-center justify-between">
                <span className="font-semibold">Page Url: </span>
                <span>{response.pageUrl}</span>
              </div>
              <div className="border-b flex flex-row items-center justify-between">
                <span className="font-semibold">Status</span>
                <span>{response.status}</span>
              </div>
              <div className="border-b flex flex-row items-center justify-between">
                <span className="font-semibold">Date Submitted: </span>
                <span>{format(response.createdAt, "HH:MM - dd.MM.yyyy")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
