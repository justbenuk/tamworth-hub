"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Ward } from "@prisma/client";
import type { ColDef } from "ag-grid-community";

export default function AllWardsTable({ wards }: { wards: Ward[] }) {
  const coldefs: ColDef<Ward>[] = [
    {
      field: "name",
      headerName: "Ward",
    },
    {
      field: "latitude",
      headerName: "latitude",
    },
    {
      field: "longitude",
      headerName: "longitude",
    },
    {
      field: "gss",
      headerName: "GSS Code",
    },
    {
      headerName: "Actions",
    },
  ];
  return <TableContainer columns={coldefs} data={wards} />;
}
