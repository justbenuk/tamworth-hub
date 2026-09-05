import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import Image from "next/image";

export default function UserCard({ user }: { user: User }) {
  return (
    <Card className="mt-30">
      <CardContent>
        <div className="flex flex-row items-center justify-center">
          <Image
            src={user.image as string}
            alt="profile Image"
            height={200}
            width={200}
            className="absolute top-20"
          />
        </div>
        <div className="mt-20 flex flex-col items-center justify-center space-y-2">
          <span className="font-semibold text-xl">{user.name}</span>
          <span className="text-muted-foreground">{user.email}</span>
          <Badge className="bg-primary capitalize">{user.role}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
