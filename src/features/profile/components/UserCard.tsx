import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User } from "@prisma/client";
import { CameraIcon } from "lucide-react";
import Image from "next/image";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      <Card className="order-2 lg:order-1">
        <CardContent>
          <Image
            src={user.image as string}
            alt="profile Image"
            height={300}
            width={300}
            className="flex flex-col items-center justify-center"
          />
          <div className="flex flex-row items-center justify-center mt-4">
            <Button
              className="border-primary border-2 text-primary hover:text-primary"
              variant={"ghost"}
            >
              <CameraIcon />
              Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="col-span-1 lg:col-span-3 lg:order-2 p-0 dark:grayscale"
        style={{
          backgroundImage: `url('/assets/town.jpg')`,
          backgroundPosition: "center",
        }}
      >
        <CardContent className="min-h-56 md:h-full p-0 m-0 space-0"></CardContent>
        <CardFooter className="bg-primary dark:bg-primary border-0 text-primary-foreground font-semibold flex flex-col lg:flex-row lg:justify-evenly items-center gap-6">
          <div>
            <span>Name: </span>
            <span>{user.name}</span>
          </div>
          <div>
            <span>Email: </span>
            <span>{user.email}</span>
          </div>
          <div>
            <span>Verified: </span>
            <span>{user.emailVerified ? "Yes" : "No"}</span>
          </div>
          <div>
            <span>Role: </span>
            <span>{user.role}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
