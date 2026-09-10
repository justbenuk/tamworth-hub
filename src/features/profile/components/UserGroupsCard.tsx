import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserGroupsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
        <CardDescription>All Active Groups</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <span>Groups are not active at the moment</span>
      </CardContent>
    </Card>
  );
}
