import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllActivityLogsAction } from "../ActivityLogActions";
import AllActivityLogTable from "../tables/AllActivityLogTable";

export default async function ActivityLogCard() {
  const logs = await FetchAllActivityLogsAction();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <AllActivityLogTable logs={logs} />
      </CardContent>
    </Card>
  );
}
