"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Category } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import EditCategoryForm from "../forms/EditCategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
export default function AllCategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  const coldefs: ColDef<Category>[] = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "slug",
      headerName: "Slug",
    },
    {
      field: "type",
      headerName: "Type",
      cellRenderer: (row: ICellRendererParams) => (
        <span className="capitalize">{row.data.type}</span>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="flex items-center h-full">
          <Button asChild variant={"ghost"}>
            <Link href={`/categories/${row.data.slug}`}>
              <EyeIcon />
            </Link>
          </Button>
          <EditCategoryForm category={row.data} />
        </div>
      ),
    },
  ];
  return <TableContainer columns={coldefs} data={categories} />;
}
