"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableSearch from "@/components/Tables/TableSearch";
import { Button } from "@/components/ui/button";
import { Business } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AllBusinessesTable({
  businesses,
}: {
  businesses: Business[];
}) {
  const [search, setSearch] = useState("");

  const columns: ColDef<Business>[] = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "slug",
      headerName: "Slug",
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
          <Button asChild variant={"ghost"} size={"icon"}>
            <Link href={`/admin/businesses/${row.data.id}`}>
              <PencilIcon />
            </Link>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TableSearch search={search} setSearch={setSearch} />
      </div>
      <TableContainer
        columns={columns}
        data={businesses}
        size={20}
        search={search}
      />
    </div>
  );
}
