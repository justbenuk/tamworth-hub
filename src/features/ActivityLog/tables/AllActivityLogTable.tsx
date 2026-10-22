"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableFilter, { TableFilterValue } from "@/components/Tables/TableFilter";
import TableSearch from "@/components/Tables/TableSearch";
import { ActivityLog } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { useState } from "react";
export default function AllActivityLogTable({ logs }: { logs: ActivityLog[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    TableFilterValue<"actorType" | "entityType">
  >({
    field: "",
    value: "",
  });

  const columns: ColDef<ActivityLog>[] = [
    {
      field: "actorType",
      headerName: "Actor Type",
    },
    {
      field: "action",
      headerName: "Action",
    },
    {
      field: "entityType",
      headerName: "Entity Type",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "visibility",
      headerName: "Visability",
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
            { value: "actorType", label: "Actor Type" },
            { value: "entityType", label: "Entity Type" },
          ]}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <TableContainer
        columns={columns}
        data={logs}
        size={50}
        search={search}
        filter={filter}
      />
    </div>
  );
}
