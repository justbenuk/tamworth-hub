import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@prisma/client";
import { Check, UsersIcon } from "lucide-react";

export default function UserStatsCard({ users }: { users: User[] }) {
  const verified = users.filter((user) => user.emailVerified === true).length;
  const banned = users.filter((user) => user.banned === true).length;
  const totalUser = users.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <span>Total Users</span>
          <UsersIcon />
        </CardHeader>
        <CardContent className="text-xl">{totalUser}</CardContent>
      </Card>
      <Card className="text-green-500">
        <CardHeader className="flex flex-row items-center justify-between">
          <span>Verified Users</span>
          <Check />
        </CardHeader>
        <CardContent className="text-xl">{verified}</CardContent>
      </Card>
      <Card className="text-red-500">
        <CardHeader className="flex flex-row items-center justify-between">
          <span>Banned Users</span>
          <UsersIcon />
        </CardHeader>
        <CardContent className="text-xl">{banned}</CardContent>
      </Card>
    </div>
  );
}
