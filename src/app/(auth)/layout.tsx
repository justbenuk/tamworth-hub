import type { Metadata } from "next";
import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import MainMenu from "@/components/Menus/MainMenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type BaseLayout = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Access your profile",
};

export default async function BaseLayout({ children }: BaseLayout) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) redirect("/profile");

  return (
    <div className="min-h-screen flex flex-col -center justify-between">
      <div className="border-b">
        <MainHeader />
        <MainMenu />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6 py-20">{children}</div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
