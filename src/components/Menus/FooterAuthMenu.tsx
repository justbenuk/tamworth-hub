import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function FooterAuthMenu() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold tracking-wide text-background">Your account</h2>
      <nav aria-label="Account" className="flex flex-col gap-2.5 text-sm text-background/65">
        {!session?.user ? (
          <>
            <Link href="/login" className="w-fit transition-colors hover:text-background">Log in</Link>
            <Link href="/register" className="w-fit transition-colors hover:text-background">Create an account</Link>
          </>
        ) : (
          <>
            <Link href="/profile" className="w-fit transition-colors hover:text-background">Your profile</Link>
            {session.user.role === "admin" && <Link href="/dashboard" className="w-fit transition-colors hover:text-background">Dashboard</Link>}
          </>
        )}
      </nav>
    </div>
  );
}
