import { auth } from "@/lib/auth";
import { UserIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AuthMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      {!session?.user ? (
        <div className="flex flex-row items-center gap-2 uppercase">
          <Link href={"/access"} className="flex flex-row items-center gap-2">
            <UserIcon className="size-3" />
            <span className="text-xs">My Account</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2 uppercase">
          <Link
            href={"/dashboard"}
            className="flex flex-row items-center gap-2"
          >
            <UserIcon className="size-3" />
            <span className="text-xs">My Account</span>
          </Link>
        </div>
      )}
    </>
  );
}
