import PageContainer from "../Page/PageContainer";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { format } from "date-fns/format";

export default async function TopHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const today = new Date();

  return (
    <div className="bg-neutral-900 py-2 text-primary-foreground">
      <PageContainer>
        <div className="flex flex-row items-center  justify-between">
          <div>{format(today, "HH:mm eeee do MMMM yyyy")}</div>
          {session?.user ? (
            <div className="flex flex-row items-center space-x-2">
              <Link href={"/profile"} className="underline">
                Profile
              </Link>
              {session?.user.role === "admin" && (
                <Link href={"/dashboard"} className="underline">
                  Dashboard
                </Link>
              )}
            </div>
          ) : (
            <Link href={"/login"} className="uderline">
              Login
            </Link>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
