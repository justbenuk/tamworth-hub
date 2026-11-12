"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableSearch from "@/components/Tables/TableSearch";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Business } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

type BusinessRow = Omit<Business, "latitude" | "longitude"> & {
  latitude: number | null;
  longitude: number | null;
};

export default function AllBusinessesTable({
  businesses,
}: {
  businesses: BusinessRow[];
}) {
  const [search, setSearch] = useState("");
  const columns: ColDef<BusinessRow>[] = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "phone",
      headerName: "Phone",
    },
    {
      field: "email",
      headerName: "Email",
    },
    {
      field: "isFeatured",
      headerName: "Featured",
    },
    {
      field: "isPublished",
      headerName: "Published",
    },
    {
      field: "createdAt",
      headerName: "Created",
      cellRenderer: (row: ICellRendererParams) => (
        <span>{format(row.data.createdAt, "HH:MM - dd.MM.yy")}</span>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      cellRenderer: (row: ICellRendererParams) => (
        <span>{format(row.data.updatedAt, "HH:MM - dd.MM.yy")}</span>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            nativeButton={false}
            render={<Link href={`/businesses/${row.data.slug}`} />}
          >
            <HugeiconsIcon icon={Eye} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            nativeButton={false}
            render={<Link href={`/dashboard/businesses/${row.data.id}`} />}
          >
            <HugeiconsIcon icon={Pencil} />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <TableSearch search={search} setSearch={setSearch} />
      </div>
      <TableContainer data={businesses} columns={columns} search={search} />
    </div>
  );
}
