import { auth } from "@/lib/auth";
import { RootProps } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthTemplate({ children }: RootProps) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) redirect('/dashboard')

  return (
    <div>{children}</div>
  )
}

