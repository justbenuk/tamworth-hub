import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SmallActivityLogCard from "@/features/ActivityLog/components/SmallActivityLogCard";
import { FetchAdminTotalsAction } from "@/features/admin/AdminActions";
import {
  FactoryIcon,
  MessageCircleIcon,
  PartyPopperIcon,
  UsersIcon,
} from "lucide-react";

export default async function DashboardPage() {
  const { totalUsers, totalNewMessages } = await FetchAdminTotalsAction();
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="flex flex-row items-center justify-between border border-green-500/30">
          <CardHeader className="flex-1 leading-3">
            <CardTitle className="text-lg">Users</CardTitle>
            <CardDescription>Total Registered Users</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <UsersIcon className="text-green-500/30" />
            <span>{totalUsers}</span>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between border border-purple-500/30">
          <CardHeader className="flex-1 leading-3">
            <CardTitle>Businesses</CardTitle>
            <CardDescription>Total Businesses Claimed</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <FactoryIcon className="text-purple-500/30" />
            <span>{totalUsers}</span>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between border border-orange-500/30">
          <CardHeader className="flex-1 leading-3">
            <CardTitle>New Messages</CardTitle>
            <CardDescription>Total New Messages</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <MessageCircleIcon className="text-orange-500/30" />
            <span>{totalNewMessages}</span>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between border border-teal-500/30">
          <CardHeader className="flex-1 leading-3">
            <CardTitle>Events</CardTitle>
            <CardDescription>Total Active Events</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <PartyPopperIcon className="text-teal-500/30" />
            <span>{totalUsers}</span>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-100">
        <SmallActivityLogCard />
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>Table will go here</CardContent>
        </Card>
      </div>
    </div>
  );
}
