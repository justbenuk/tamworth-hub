"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Prisma } from "@prisma/client";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import EditWardDialog from "../components/EditWardDialog";
import DeleteWard from "../components/DeleteWard";

type WardProps = Prisma.WardGetPayload<{
  include: {
    councilors: true;
  };
}>;

export default function AllWardsTable({ wards }: { wards: WardProps[] }) {
  const coldefs: ColDef<WardProps>[] = [
    {
      field: "name",
      headerName: "Ward",
    },
    {
      field: "councilors",
      headerName: "Counilors",
      valueGetter: (params) => params.data?.councilors.length ?? 0,
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
      cellRenderer: (row: ICellRendererParams) => (
        <div className="flex items-center h-full">
          <EditWardDialog ward={row.data} />
          <DeleteWard id={row.data.id} />
        </div>
      ),
    },
  ];
  return <TableContainer columns={coldefs} data={wards} />;
}
