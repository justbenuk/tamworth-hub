"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableFilter, { TableFilterValue } from "@/components/Tables/TableFilter";
import TableSearch from "@/components/Tables/TableSearch";
import { ContactSubmission } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { useState } from "react";
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

  const columns: ColDef<ContactSubmission>[] = [
    {
      field: "type",
      headerName: "Type",
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
      headerName: "Status URL",
    },
    {
      field: "createdAt",
      headerName: "Created",
      cellRenderer: (row: ICellRendererParams) => (
        <span>{format(row.data.createdAt, "dd-MM-yyyy HH:MM")}</span>
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
