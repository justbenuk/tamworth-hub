import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/sesstions";
import Image from "next/image";
import { format } from "date-fns";
import ProfileImageUploadButton from "@/features/Profile/Components/ProfileImageUploadButton";
import ChangePasswordForm from "@/features/auth/forms/ChangePasswordForm";

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="col-span-1">
        <Card>
          <CardContent className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={user.image || "/images/profile.png"}
              alt="Profile Image"
              width={500}
              height={500}
              className="object-cover w-full rounded-lg"
            />
            <ProfileImageUploadButton />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 md:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-semibold text-xl">
              Profile Information
            </CardTitle>
            <CardDescription>
              Manage your profile information here
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div>
              <span className="font-semibold">Name: </span>
              <span>{user.name}</span>
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              <span>{user.email}</span>
            </div>
            <div>
              <span className="font-semibold">Role: </span>
              <span>{user.role}</span>
            </div>
            <div>
              <span className="font-semibold">Member Since: </span>
              <span>{format(user.createdAt, "dd/MM/yyyy")}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Manage your password</CardDescription>
            <CardContent className="p-0">
              <ChangePasswordForm />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
