"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { User } from "@prisma/client";
import { CameraIcon, CheckCheckIcon, CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      <Card>
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

      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4 items-center">
              <span className="text-primary-foreground font-semibold">
                Name:{" "}
              </span>
              <span>{user.name}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span className="text-primary-foreground font-semibold">
                Email:{" "}
              </span>
              <span>{user.email}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-primary-foreground font-semibold">
                Verified:{" "}
              </span>
              <span>
                {user.emailVerified ? (
                  <CheckIcon className="size-4 text-green-500" />
                ) : (
                  <XIcon className="size-4 text-red-500" />
                )}
              </span>
              {!user.emailVerified && (
                <Button
                  variant={"link"}
                  className="text-primary-foreground text-xs underline"
                  onClick={async () => {
                    await authClient.sendVerificationEmail({
                      email: user.email,
                      callbackURL: "/dashboard/profile",
                    });
                  }}
                >
                  Verify Now
                </Button>
              )}
            </div>
            <div className="flex flex-row items-center gap-4">
              <span className="text-primary-foreground font-semibold">
                Role:{" "}
              </span>
              <Badge>{user.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
