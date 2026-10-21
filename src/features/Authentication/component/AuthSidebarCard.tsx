import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AuthSidebarCard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) return null;

  return (
    <>
      {!session?.user && (
        <Card>
          <CardContent className="flex flex-col itsm-center justify-center gap-4">
            <Button asChild variant={"secondary"}>
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
