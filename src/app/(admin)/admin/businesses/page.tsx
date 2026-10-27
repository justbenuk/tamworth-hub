import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllBusinesses } from "@/features/Business/BusinessActions";
import AllBusinessesTable from "@/features/Business/tables/AllBusinessesTable";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AdminBusinessesPage() {
  const businesses = await FetchAllBusinesses();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Businesses</CardTitle>
        <Button asChild>
          <Link
            href={"/admin/businesses/new"}
            className="flex flex-row items-center gap-2"
          >
            <PlusIcon />
            <span>New Business</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <AllBusinessesTable businesses={businesses} />
      </CardContent>
    </Card>
  );
}
