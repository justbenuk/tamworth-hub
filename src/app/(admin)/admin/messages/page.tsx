import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AllMessagesTable from "@/features/admin/tables/AllMessagesTable";
import { FetchAllMessagesAction } from "@/features/Contact/ContactActions";

export default async function AdminMessagesPage() {
  const messages = await FetchAllMessagesAction();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <AllMessagesTable messages={messages} />
      </CardContent>
    </Card>
  );
}
