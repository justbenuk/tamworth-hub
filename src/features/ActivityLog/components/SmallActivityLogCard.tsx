import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllActivityLogsAction } from "../ActivityLogActions";
import SmallActivityLogTable from "../tables/SmallActivityLogTable";

export default async function SmallActivityLogCard() {
  const logs = await FetchAllActivityLogsAction(10);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <SmallActivityLogTable logs={logs} />
      </CardContent>
    </Card>
  );
}
