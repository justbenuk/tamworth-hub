"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableSearch from "@/components/Tables/TableSearch";
import { Prisma } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useState } from "react";

type BussinessCategoryWithCount = Prisma.BusinessCategoryGetPayload<{
  include: {
    _count: {
      select: {
        children: true;
      };
    };
  };
}>;

export default function AllBusinessCategoriesTable({
  categories,
}: {
  categories: BussinessCategoryWithCount[];
}) {
  const [search, setSearch] = useState("");

  const columns: ColDef<BussinessCategoryWithCount>[] = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "slug",
      headerName: "Slug",
    },
    {
      field: "isActive",
      headerName: "Active",
    },
    {
      headerName: "Sub categories",
      cellRenderer: (row: ICellRendererParams) =>
        row.data?._count.children ?? 0,
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <TableSearch search={search} setSearch={setSearch} />
      </div>
      <TableContainer data={categories} columns={columns} search={search} />;
    </div>
  );
}
