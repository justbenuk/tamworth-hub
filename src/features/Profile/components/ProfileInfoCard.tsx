import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "better-auth";
import { format } from "date-fns";

export default function ProfileInfoCard({ user }: { user: User }) {
  console.log(user);
  return (
    <Card className="p-0">
      <CardHeader className="bg-primary h-10"></CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
        <div className="col-span-1 -mt-13 absolute">
          <div className="flex flex-row items-center justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.image || "/assets/profile.png"} />
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-6">
          <div className="flex flex-col lg:flex-row items-center lg:justify-evenly w-full pb-4">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>Member Since: {format(user.createdAt, "dd/MM/yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
