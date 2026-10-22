import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardTitle from "@/features/Dashboard/components/DashboardTitle";
import { requireUser } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await requireUser();

  if (!user) redirect("/login");
  return (
    <div className="grid gap-6">
      <DashboardTitle
        title="Welcome Back"
        description="Manage you presence here"
        name={user.name}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-row items-center justify-between">
          <CardHeader className="flex-1 leading-3">
            <CardTitle>Box 1</CardTitle>
            <CardDescription>A sample Box</CardDescription>
          </CardHeader>
          <CardContent>ico</CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between">
          <CardHeader className="flex-1 leading-3">
            <CardTitle>Box 1</CardTitle>
            <CardDescription>A sample Box</CardDescription>
          </CardHeader>
          <CardContent>ico</CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between">
          <CardHeader className="flex-1 leading-3">
            <CardTitle>Box 1</CardTitle>
            <CardDescription>A sample Box</CardDescription>
          </CardHeader>
          <CardContent>ico</CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-100">
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>Table will go here</CardContent>
        </Card>
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
