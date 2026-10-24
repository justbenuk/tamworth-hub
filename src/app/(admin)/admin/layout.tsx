import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/components/AdminHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Tamworth Hub",
    default: "Admin Tamworth Hub",
  },
};
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user || session?.user.role !== "admin") redirect("/access");

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-gray-100">
        <AdminHeader />
        <PageContainer size="large" className="py-6">
          {children}
        </PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
