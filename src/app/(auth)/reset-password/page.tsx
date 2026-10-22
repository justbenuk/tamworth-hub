import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "@/features/Authentication/forms/ResetPasswordForm";
import { redirect } from "next/navigation";

type ResetPasswordProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function page({ searchParams }: ResetPasswordProps) {
  const { token } = await searchParams;

  if (!token) redirect("/unautorised");
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>All active sessions will be ended</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ResetPasswordForm token={token} />
      </CardContent>
    </Card>
  );
}
