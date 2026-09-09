"use client";
import {
  AllCommunityModule,
  themeQuartz,
  type ColDef,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useState } from "react";
import TableSearch from "./TableSearch";

type TableRow = {
  id: string | number;
};

type TableContainerProps<TData extends TableRow> = {
  data: TData[];
  columns: ColDef<TData>[];
  size?: 10 | 20 | 50 | 100;
};

export default function TableContainer<TData extends TableRow>({
  data,
  columns,
  size = 20,
}: TableContainerProps<TData>) {
  const modules = [AllCommunityModule];
  const [search, setSearch] = useState("");

  const defaultColDef: ColDef<TData> = {
    sortable: true,
    filter: true,
  };

  const myTheme = themeQuartz.withParams({
    backgroundColor: "var(--background)",
    foregroundColor: "var(--foreground)",
    borderColor: "var(--border)",
    headerBackgroundColor: "var(--muted)",
    borderRadius: "0px",
  });

  return (
    <AgGridProvider modules={modules}>
      <div className="grid gap-6">
        <div className="flex flex-row items-end-end md:w-1/2">
          <TableSearch
            title="Search..."
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="w-full overflow-x-auto">
          <div className="w-[700px] md:w-full">
            <AgGridReact<TData>
              quickFilterText={search}
              defaultColDef={defaultColDef}
              domLayout="autoHeight"
              theme={myTheme}
              rowData={data}
              columnDefs={columns}
              getRowId={(row) => String(row.data.id)}
              pagination={true}
              paginationPageSizeSelector={[10, 20, 50, 100]}
              paginationPageSize={size}
              autoSizeStrategy={{
                type: "fitGridWidth",
              }}
            />
          </div>
        </div>
      </div>
    </AgGridProvider>
  );
}
