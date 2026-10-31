"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableFilter, { TableFilterValue } from "@/components/Tables/TableFilter";
import TableSearch from "@/components/Tables/TableSearch";
import { Event } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { useState } from "react";
import Image from "next/image";
import ChangeEventStatus from "../components/ChangeEventStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon, PencilIcon } from "lucide-react";

export default function AllEventsTable({
  events,
}: {
  events: Event[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    TableFilterValue<"status">
  >({
    field: "",
    value: "",
  });

  const columns: ColDef<Event>[] = [
    {
      field: 'image',
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Image src={row.data.image || '/images/business-placeholder.svg'} alt='Event Image' width={50} height={50} className="aspect-square" />
        </div>
      )
    },
    {
      field: "title",
      headerName: "Title",
    },
    {
      field: "category",
      headerName: "Category",
    },
    {
      field: "venue",
      headerName: "Venue Number",
    },
    {
      field: "startDate",
      headerName: "Start Date",
    },
    {
      field: "endDate",
      headerName: "End Date",
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <ChangeEventStatus id={row.data.id} status={row.data.status} />
        </div>
      )
    },
    {
      field: "createdAt",
      headerName: "Created",
      cellRenderer: (row: ICellRendererParams) => (
        <span>{format(row.data.createdAt, "HH:MM - dd.MM.yy")}</span>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Button variant={'ghost'} size={'icon-xs'}>
            <Link href={`/events/${row.data.slug}`}>
              <EyeIcon />
            </Link>
          </Button>
          <Button asChild variant={'ghost'} size={'icon-xs'}>
            <Link href={`/admin/events/${row.data.id}`}>
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
        <TableFilter
          fields={[
            { value: "status", label: "Status" },
          ]}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <TableContainer
        columns={columns}
        data={events}
        size={20}
        search={search}
        filter={filter}
      />
    </div>
  );
}
