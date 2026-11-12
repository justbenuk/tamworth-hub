import PageContainer from "../Page/PageContainer";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { format } from "date-fns/format";

export default async function TopHeader() {
  const session = await auth.api.getSession({ headers: await headers() });
  const today = new Date();

  return (
    <div className="bg-foreground py-2 text-background">
      <PageContainer>
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
          <p className="truncate text-background/75">Local stories, places and people from around Tamworth</p>
          <div className="flex shrink-0 items-center gap-4">
            <time className="hidden text-background/65 sm:block" dateTime={today.toISOString()}>
              {format(today, "EEEE, d MMMM")}
            </time>
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="transition-colors hover:text-primary-foreground/70">Profile</Link>
                {session.user.role === "admin" && (
                  <Link href="/dashboard" className="transition-colors hover:text-primary-foreground/70">Dashboard</Link>
                )}
              </div>
            ) : (
              <Link href="/login" className="rounded-full bg-background/10 px-3 py-1 transition-colors hover:bg-background/20">Login</Link>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
