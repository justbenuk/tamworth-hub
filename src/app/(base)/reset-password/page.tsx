import PageContainer from "@/components/PageContainer";
import SiteLogo from "@/components/SiteLogo";
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
    <PageContainer size="small">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <SiteLogo size="large" />
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold text-3xl">Reset Your Password</h2>
            <p>All active sessions will be ended</p>
          </div>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </PageContainer>
  );
}
