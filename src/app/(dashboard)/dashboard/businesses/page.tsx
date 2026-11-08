import EmptyCard from "@/components/Shared/EmptyCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchAllBusinessesAction } from "@/features/Businesses/BusinessActions";
import AllBusinessesTable from "@/features/Businesses/Tables/AllBusinessesTable";
import { requireAdmin } from "@/lib/sesstions";
import { Check, Factory, Plus, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "All Businesses",
};
export default async function DashboardBusinessesPage() {
  const businesses = await FetchAllBusinessesAction();
  const total = businesses.length;
  const claimed = businesses.filter((business) => business.ownerId).length;
  const featured = businesses.filter((business) => business.isFeatured).length;

  if (!businesses) {
    return (
      <EmptyCard
        title="Nothing Found"
        description="Failed to fetch businesses, Contact the administrator"
      />
    );
  }
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Businesses</CardTitle>
            <CardDescription>
              <HugeiconsIcon icon={Factory} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-end text-xl font-semibold">
            {total}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Claimed Businesses</CardTitle>
            <CardDescription>
              <HugeiconsIcon icon={Check} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-end text-xl font-semibold">
            {claimed}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Featured Businesses</CardTitle>
            <CardDescription>
              <HugeiconsIcon icon={Star} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-end text-xl font-semibold">
            {featured}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex-1">
            <CardTitle className="font-semibold text-xl">Businesses</CardTitle>
            <CardDescription>Manage all businesses</CardDescription>
          </div>
          <Button
            nativeButton={false}
            render={<Link href={"/dashboard/businesses/new"} />}
          >
            <HugeiconsIcon icon={Plus} />
            <span>Business</span>
          </Button>
        </CardHeader>
        <CardContent>
          <AllBusinessesTable businesses={businesses} />
        </CardContent>
      </Card>
    </div>
  );
}
