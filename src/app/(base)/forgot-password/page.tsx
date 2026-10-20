import PageContainer from "@/components/PageContainer";
import SiteLogo from "@/components/SiteLogo";
import ForgotPasswordForm from "@/features/Authentication/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <PageContainer size="small">
      <div className="grid gap-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <SiteLogo size="large" />
          <div className="text-center">
            <h2 className="font-semibold text-center text-3xl">
              Have you forgotten your password?
            </h2>
            <p>Enter your email to reset your password</p>
          </div>
        </div>
        <div>
          <ForgotPasswordForm />
        </div>
      </div>
    </PageContainer>
  );
}
