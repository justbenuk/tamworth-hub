"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableFilter, { TableFilterValue } from "@/components/Tables/TableFilter";
import TableSearch from "@/components/Tables/TableSearch";
import { ContactSubmission, ContactType } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ChangeFormStatusForm from "@/features/Contact/forms/ChangeFormStatusForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import DeleteContactSubmission from "@/features/Contact/forms/DeleteContactSubmission";

export default function AllMessagesTable({
  messages,
}: {
  messages: ContactSubmission[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TableFilterValue<"status" | "type">>({
    field: "",
    value: "",
  });

  const contactTypeConfig = {
    [ContactType.GENERAL]: {
      label: "General",
      className: "bg-blue-100 text-blue-800",
    },
    [ContactType.SUGGESTION]: {
      label: "Suggestion",
      className: "bg-purple-100 text-purple-800",
    },
    [ContactType.BUG]: {
      label: "Bug",
      className: "bg-red-100 text-red-800",
    },
    [ContactType.LISTING]: {
      label: "Listing",
      className: "bg-green-100 text-green-800",
    },
    [ContactType.ACCOUNT]: {
      label: "Account",
      className: "bg-orange-100 text-orange-800",
    },
  };

  function ContactTypeBadge({ type }: { type: ContactType }) {
    const config = contactTypeConfig[type];

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  }

  const columns: ColDef<ContactSubmission>[] = [
    {
      field: "type",
      headerName: "Type",
      cellRenderer: (row: ICellRendererParams) => {
        return <ContactTypeBadge type={row.data?.type} />;
      },
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "email",
      headerName: "Email Address",
    },
    {
      field: "subject",
      headerName: "Subject",
    },
    {
      field: "pageUrl",
      headerName: "Page URL",
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (row: ICellRendererParams) =>
        row.data ? (
          <div className="h-full flex items-center">
            <ChangeFormStatusForm id={row.data.id} status={row.data.status} />
          </div>
        ) : null,
    },
    {
      field: "createdAt",
      headerName: "Created",
      cellRenderer: (row: ICellRendererParams) => (
        <span>{format(row.data.createdAt, "dd-MM-yyyy HH:MM")}</span>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Button asChild size={"icon"} variant={"ghost"}>
            <Link href={`/admin/messages/${row.data.id}`}>
              <Eye />
            </Link>
          </Button>
          <DeleteContactSubmission id={row.data.id} />
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
            { value: "type", label: "Type" },
          ]}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <TableContainer
        columns={columns}
        data={messages}
        size={20}
        search={search}
        filter={filter}
      />
    </div>
  );
}
