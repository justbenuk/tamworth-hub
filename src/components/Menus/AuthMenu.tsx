import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AuthMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      {!session?.user ? (
        <div className="flex flex-row items-center gap-2">
          <Button asChild variant={"secondary"} size={"sm"}>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button asChild size={"sm"}>
            <Link href={"/register"}>Register</Link>
          </Button>
        </div>
      ) : (
        <>
          <Button size={"sm"} asChild>
            <Link href={"/dashboard"}>My Account</Link>
          </Button>
        </>
      )}
    </>
  );
}
