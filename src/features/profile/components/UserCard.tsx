import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import Image from "next/image";

export default function UserCard({ user }: { user: User }) {
  console.log(user);
  return (
    <Card className="mt-30">
      <CardContent className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-row items-center justify-center">
          <Image
            src={user.image as string}
            alt="profile Image"
            height={150}
            width={150}
          />
        </div>
        <div>
          <span className="font-semibold text-xl">{user.name}</span>
          <span className="text-muted-foreground">{user.email}</span>
          <Badge className="bg-primary capitalize">{user.role}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
