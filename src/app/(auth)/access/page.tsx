import PageContainer from "@/components/PageContainer";
import LoginForm from "@/features/Authentication/forms/LoginForm";
import RegisterForm from "@/features/Authentication/forms/RegisterForm";

export default function AccessPage() {
  return (
    <PageContainer>
      <div className="flex flex-col justify-center py-20 w-full min-h-[60dvh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
          <div className="lg:border-r  lg:border-primary lg:pr-20">
            <LoginForm />
          </div>
          <div className="lg:pl-20">
            <RegisterForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
