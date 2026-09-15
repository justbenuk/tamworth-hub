"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Prisma } from "@prisma/client";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";

type CouncillorProps = Prisma.CouncillorGetPayload<{
  include: {
    ward: true;
    image: true;
  };
}>;

export default function AllCouncillorsTable({
  councillors,
}: {
  councillors: CouncillorProps[];
}) {
  const coldefs: ColDef<CouncillorProps>[] = [
    {
      field: "image",
      headerName: "Profile Image",
      cellRenderer: (row: ICellRendererParams<CouncillorProps>) => (
        <div className="flex h-full items-center">
          <Image
            src={row.data?.image.url || null}
            alt={row.data?.name as string}
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "ward.name",
      headerName: "Ward",
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
    },
    {
      field: "email",
      headerName: "Email",
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="flex items-center h-full"></div>
      ),
    },
  ];
  return <TableContainer columns={coldefs} data={councillors} />;
}
