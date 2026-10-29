import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { headers } from "next/headers";
import Link from "next/link";
import PageContainer from "../PageContainer";

export default async function TopMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const date = new Date();
  return (
    <div className="site-footer py-2">
      <PageContainer>
        <div className="flex flex-row justify-between items-center">
          <div className="text-xs font-semibold">
            {format(date, "EEEE do MMMM yyyy", {
              useAdditionalDayOfYearTokens: true,
            }).toString()}
          </div>
          <div className="text-xs uppercase font-semibold">
            {session?.user ? (
              <Link href={"/dashboard"}>My Account</Link>
            ) : (
              <Link href={"/access"}>My Account</Link>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
