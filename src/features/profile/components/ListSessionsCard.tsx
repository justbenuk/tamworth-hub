import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CurrentUserSessionsTable from "../tables/CurrentUserSessionsTable";

export default async function ListSessionsCard() {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>All active sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <CurrentUserSessionsTable sessions={sessions} />
      </CardContent>
    </Card>
  );
}
