"use client";
import TableContainer from "@/components/tables/TableContainer";
import type { User } from "@prisma/client";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Check, XIcon } from "lucide-react";
import Image from "next/image";

export default function AllUsersTable({ users }: { users: User[] }) {
  console.log(users);
  const columnDefs: ColDef<User>[] = [
    {
      field: "image",
      headerName: "Profile Image",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <div className="flex h-full items-center">
          <Image
            src={row.data?.image || "/assets/profile.png"}
            alt={row.data?.name || "Profile image"}
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
      field: "email",
      headerName: "Email",
    },
    {
      field: "emailVerified",
      headerName: "Verified",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <div className="flex h-full items-center">
          {row.data?.emailVerified ? (
            <Check className="size-5 text-green-500" />
          ) : (
            <XIcon className="size-5 text-red-500" />
          )}
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
    },
    {
      field: "banned",
      headerName: "Banned",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <div className="flex h-full items-center">
          {row.data?.banned ? (
            <Check className="size-5 text-red-500" />
          ) : (
            <XIcon className="size-5 text-green-500" />
          )}
        </div>
      ),
    },
    {
      headerName: "Actions",
    },
  ];
  return <TableContainer columns={columnDefs} data={users} />;
}
