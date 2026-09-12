"use client";
import ImageUploadButton from "@/components/ImageUploadButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import type { User } from "@prisma/client";
import { CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserCard({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      <Card>
        <CardContent>
          <Image
            src={user.image || "/assets/profile.png"}
            alt="profile Image"
            height={300}
            width={300}
            className="flex flex-col items-center justify-center"
          />
          <div className="flex flex-row items-center justify-center mt-4">
            <ImageUploadButton
              endpoint="profileImageUploader"
              onUploadComplete={() => router.refresh()}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-3">
        <CardContent className="grid grid-cols-1 md:grid-cols-2">
          <div className="order-1 flex flex-col gap-6">
            <div>
              <h1 className="font-semibold">Profile Information</h1>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary-foreground text-sm">Name</span>
              <span className="text-lg">{user.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary-foreground text-xs">Email</span>
              <span className="text-lg">{user.email}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-secondary-foreground text-xs">
                Verified User
              </span>
              <div className="flex flex-row items-center">
                <span>
                  {user.emailVerified ? (
                    <CheckIcon className="size-6 text-green-500" />
                  ) : (
                    <XIcon className="size-6 text-red-500" />
                  )}
                </span>
                {!user.emailVerified && (
                  <Button
                    variant={"link"}
                    className="text-secondary-foreground text-xs underline"
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
            </div>
            <div className="flex flex-col">
              <span className="text-secondary-foreground text-xs">Role: </span>
              <Badge>{user.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
