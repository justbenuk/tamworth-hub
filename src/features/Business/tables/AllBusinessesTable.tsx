"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableFilter, { TableFilterValue } from "@/components/Tables/TableFilter";
import TableSearch from "@/components/Tables/TableSearch";
import { Button } from "@/components/ui/button";
import { Business } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteBusinessForm from "../forms/DeleteBusinessForm";
import Image from "next/image";

export default function AllBusinessesTable({
  businesses,
}: {
  businesses: Business[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    TableFilterValue<"isPublished" | "isFeatured">
  >({
    field: "",
    value: "",
  });

  const columns: ColDef<Business>[] = [
    {
      field: 'image',
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Image src={row.data.image || '/images/business-placeholder.svg'} alt='business image' width={50} height={50} />
        </div>
      )
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "slug",
      headerName: "Slug",
    },
    {
      field: "phone",
      headerName: "Phone Number",
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
        <div className="h-full flex items-center gap-3">
          <Button asChild variant={"outline"} size={"icon-sm"}>
            <Link href={`/businesses/${row.data.slug}`}>
              <EyeIcon className="size-3" />
            </Link>
          </Button>
          <Button asChild variant={"outline"} size={"icon-sm"}>
            <Link href={`/admin/businesses/${row.data.id}`}>
              <PencilIcon className="size-3" />
            </Link>
          </Button>
          <DeleteBusinessForm id={row.data.id} />
        </div>
      ),
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TableSearch search={search} setSearch={setSearch} />
        <TableFilter
          fields={[
            { value: "isFeatured", label: "Featured" },
            { value: "isPublished", label: "Published" },
          ]}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <TableContainer
        columns={columns}
        data={businesses}
        size={20}
        search={search}
        filter={filter}
      />
    </div>
  );
}
