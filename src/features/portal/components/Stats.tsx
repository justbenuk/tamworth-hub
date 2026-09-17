import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "../PortalActions";
import { UsersIcon, VideoIcon } from "lucide-react";

export default async function Stats() {
  const { members, media } = await DashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between">
            <span>Members</span>
            <UsersIcon />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-baseline justify-between gap-4">
            <span className="font-semibold">Total</span>
            <span className="text-2xl">{members}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between">
            <span>Media</span>
            <VideoIcon />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-baseline justify-between gap-4">
            <span className="font-semibold">Total</span>
            <span className="text-2xl">{media}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
