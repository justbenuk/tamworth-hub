import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserAvatar from "../UserAvatar";

export default async function AuthMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return <UserAvatar user={session.user} />;
}
