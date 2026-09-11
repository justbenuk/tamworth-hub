import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import CurrentUserSessionsTable from "../tables/CurrentUserSessionsTable";
import SignInAgainButton from "@/features/authentication/components/SignInAgainButton";

export default async function ListSessionsCard() {
  let sessions: Awaited<ReturnType<typeof auth.api.listSessions>> | null = null;

  try {
    sessions = await auth.api.listSessions({
      headers: await headers(),
    });
  } catch (error) {
    if (!isAPIError(error) || error.body?.code !== "SESSION_NOT_FRESH") {
      throw error;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>All active sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {sessions === null ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Sign in again to view your active sessions. This will sign you out
              on this device first.
            </p>
            <SignInAgainButton />
          </div>
        ) : (
          <CurrentUserSessionsTable sessions={sessions} />
        )}
      </CardContent>
    </Card>
  );
}
