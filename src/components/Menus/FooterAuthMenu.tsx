import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function FooterAuthMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-2xl border-b border-primary py-2">
        Account
      </h2>
      <nav className="flex flex-col space-y-2">
        {!session?.user ? (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
          </>
        ) : (
          <>
            <Link href={"/login"}>Your Profile</Link>
            <Link href={"/register"}>Your Business</Link>
            <Link href={"/register"}>Your Events</Link>
            <Link href={"/register"}>Your Jobs</Link>
          </>
        )}
      </nav>
    </div>
  );
}
