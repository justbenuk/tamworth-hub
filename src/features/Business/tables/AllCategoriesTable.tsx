"use client";
import TableContainer from "@/components/Tables/TableContainer";
import TableSearch from "@/components/Tables/TableSearch";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UpdateCategory } from "../BusinessActions";
import UpdateCatogeryForm from "../forms/UpdateCatogeryForm";

type CategoryWithCountProps = Prisma.BusinessCategoryGetPayload<{
  include: {
    _count: {
      select: {
        children: true;
      };
    };
  };
}>;
export default function AllCategoriesTable({
  categories,
}: {
  categories: CategoryWithCountProps[];
}) {
  const [search, setSearch] = useState("");

  const columns: ColDef<CategoryWithCountProps>[] = [
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
      headerName: "Status",
    },
    {
      headerName: "Subcategories",
      valueGetter: (params) => params.data?._count.children ?? 0,
      width: 160,
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="h-full flex items-center">
          <Button asChild variant={"ghost"} size={"icon"}>
            <Link href={`/businesses/categories/${row.data.slug}`}>
              <Eye className="size-4" />
            </Link>
          </Button>
          <UpdateCatogeryForm category={row.data} categories={categories} />
        </div>
      ),
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TableSearch search={search} setSearch={setSearch} />
      </div>
      <TableContainer
        columns={columns}
        data={categories}
        size={20}
        search={search}
      />
    </div>
  );
}
