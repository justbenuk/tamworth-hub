"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableSearch from "@/components/Tables/TableSearch";
import { Button } from "@/components/ui/button";
import { Eye } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Prisma } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import Link from "next/link";
import { useState } from "react";
import BusinessCategoryForm from "../Forms/BusinessCategoryForm";

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
    {
      field: "sortOrder",
      headerName: "Sort Order",
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            nativeButton={false}
            render={<Link href={`/businesses/categories/${row.data.slug}`} />}
          >
            <HugeiconsIcon icon={Eye} />
          </Button>
          <BusinessCategoryForm
            mode="edit"
            category={row.data}
            categories={categories}
          />
        </div>
      ),
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
