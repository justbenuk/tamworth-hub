"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInAgainButton() {
  const [isPending, setIsPending] = useState(false);

  async function handleSignInAgain() {
    setIsPending(true);

    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("Could not sign you out. Please try again.");
        setIsPending(false);
        return;
      }

      // A full navigation clears cached authenticated pages after sign-out.
      window.location.replace("/login");
    } catch {
      toast.error("Could not sign you out. Please try again.");
      setIsPending(false);
    }
  }

  return (
    <Button type="button" onClick={handleSignInAgain} disabled={isPending}>
      {isPending ? "Signing out…" : "Sign in again"}
    </Button>
  );
}
