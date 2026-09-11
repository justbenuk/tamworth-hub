"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
          router.refresh();
        },
      },
    });
  }
  return (
    <Button
      type="button"
      onClick={handleSignOut}
      variant={"destructive"}
      className="w-full flex items-center justify-items-start"
    >
      <LockIcon />
      <span>Log Out</span>
    </Button>
  );
}
