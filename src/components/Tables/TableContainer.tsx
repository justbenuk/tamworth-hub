"use client";
import {
  type ColDef,
  themeMaterial,
  AllCommunityModule,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import type { TableFilterValue } from "./TableFilter";

type TableRowProps = {
  id: string | number;
};

type TableContainerProps<TData extends TableRowProps> = {
  data: TData[];
  columns: ColDef<TData>[];
  size?: 10 | 20 | 50 | 100;
  search?: string;
  filter?: TableFilterValue<Extract<keyof TData, string>>;
};

export default function TableContainer<TData extends TableRowProps>({
  data,
  columns,
  size = 20,
  search = "",
  filter,
}: TableContainerProps<TData>) {
  const modules = [AllCommunityModule];
  const field = filter?.field;
  const value = filter?.value.trim().toLowerCase() ?? "";
  const filteredData = useMemo(() => {
    if (!field || !value) return data;

    return data.filter((row) => {
      const cell = row[field];
      return cell != null && String(cell).toLowerCase().includes(value);
    });
  }, [data, field, value]);

  const defaultColDef: ColDef<TData> = {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 120,
  };

  const myTheme = themeMaterial.withParams({
    backgroundColor: "var(--background)",
    foregroundColor: "var(--foreground)",
    borderColor: "var(--border)",
    headerBackgroundColor: "var(--muted)",
    borderRadius: "0px",
    wrapperBorder: true,
  });

  return (
    <AgGridProvider modules={modules}>
      <div className="grid min-w-0 gap-6">
        <AgGridReact<TData>
          quickFilterText={search}
          defaultColDef={defaultColDef}
          theme={myTheme}
          domLayout="autoHeight"
          rowData={filteredData}
          columnDefs={columns}
          getRowId={(row) => String(row.data.id)}
          pagination={true}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          paginationPageSize={size}
        />
      </div>
    </AgGridProvider>
  );
}
