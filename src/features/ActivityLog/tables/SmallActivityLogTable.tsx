"use client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityLog } from "@prisma/client";

export default function SmallActivityLogTable({
  logs,
}: {
  logs: ActivityLog[];
}) {
  console.log(logs);
  return (
    <Table>
      <TableCaption>Last 10 activities logged</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Visability</TableHead>
          <TableHead>Time/Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.actorType}</TableCell>
            <TableCell>{log.entityType}</TableCell>
            <TableCell>{log.action}</TableCell>
            <TableCell>{log.visibility}</TableCell>
            <TableCell>{format(log.createdAt, "HH:MM - dd/MM/yyyy")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
