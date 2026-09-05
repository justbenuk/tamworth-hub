import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";

export default function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader className="leading-none">
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>info will go here</CardContent>
    </Card>
  );
}
