import { getSession } from "@/features/authentication/lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { LuCastle } from "react-icons/lu";

interface Props {
  children: ReactNode;
}
export default async function AuthLayout({ children }: Props) {
  const session = await getSession();
  if (session?.user) redirect("/profile");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LuCastle />
            </div>
            Tamworth Hub
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="p-4">
          <div className="attribution z-10 absolute text-xs font-bold bg-gray-900/10 rounded-full px-6 py-2">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.geograph.org.uk/profile/56680"
            >
              Credit to Martin Richard Phelan
            </Link>{" "}
          </div>
        </div>
        <Image
          src="/assets/town.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
        />
      </div>
    </div>
  );
}
