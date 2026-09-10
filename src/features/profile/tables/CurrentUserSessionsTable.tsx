"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Button } from "@/components/ui/button";
import type { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import type {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { useRouter } from "next/navigation";

type SessionProps = Awaited<ReturnType<typeof auth.api.listSessions>>[number];

function formatSessionDate({
  value,
}: ValueFormatterParams<SessionProps, Date>) {
  return value?.toLocaleString("en-GB") ?? "";
}

export default function CurrentUserSessionsTable({
  sessions,
}: {
  sessions: SessionProps[];
}) {
  const router = useRouter();
  const { data: currentSession, isPending } = authClient.useSession();
  async function handleRevokeSession(token: string) {
    await authClient.revokeSession({
      token: token,
    });
    router.refresh();
  }

  const columnDefs: ColDef<SessionProps>[] = [
    {
      field: "userAgent",
    },
    {
      field: "ipAddress",
    },
    {
      field: "createdAt",
      valueFormatter: formatSessionDate,
    },
    {
      field: "updatedAt",
      valueFormatter: formatSessionDate,
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div>
          <Button
            onClick={() => handleRevokeSession(row.data.token)}
            variant={"destructive"}
            disabled={
              isPending || currentSession?.session.token === row.data.token
            }
          >
            Revoke
          </Button>
        </div>
      ),
    },
  ];
  return <TableContainer columns={columnDefs} data={sessions} />;
}
