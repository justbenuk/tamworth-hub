import SmallFooter from "@/components/footers/SmallFooter";
import MainHeader from "@/components/headers/MainHeader";
import PageContainer from "@/components/PageContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) redirect("/dashboard/profile");
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <MainHeader />
      <PageContainer size="small">{children}</PageContainer>
      <SmallFooter />
    </div>
  );
}
