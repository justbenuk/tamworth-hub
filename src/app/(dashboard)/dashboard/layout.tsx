import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/features/Dashboard/components/DashboardHeader";
import DashboardSidebar from "@/features/Dashboard/components/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard Tamworth Hub",
    default: "Dashboard Tamworth Hub",
  },
};
export default async function Profileayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect("/acccess");

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-gray-100">
        <DashboardHeader />
        <PageContainer size="large" className="py-6">
          {children}
        </PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
