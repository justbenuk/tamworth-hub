"use client";

import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import MainMenu from "@/components/Menus/MainMenu";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowLeft,
  RotateClockwiseFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <MainHeader />
        <MainMenu />
      </div>
      <main className="container-site py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold text-primary mb-6">
            TAMWORTH HUB / SOMETHING WENT WRONG
          </p>

          <div className="border-t-4 border-primary bg-muted/50 p-6 md:p-10">
            <div className="flex items-start gap-5">
              <div className="flex size-14 shrink-0 items-center justify-center bg-primary/10">
                <HugeiconsIcon
                  icon={AlertTriangle}
                  className="size-7 text-primary"
                />
              </div>

              <div>
                <p className="font-heading text-xl font-extrabold uppercase tracking-wide text-primary">
                  Temporary interruption
                </p>

                <h1 className="mt-3 font-heading text-5xl font-black leading-none md:text-7xl">
                  We&apos;ve hit a snag.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                  Something unexpected happened while loading this page. Please
                  try again. If the problem continues, you can return to the
                  homepage.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={reset} size="lg" className="rounded-sm px-6">
                    <HugeiconsIcon
                      icon={RotateClockwiseFreeIcons}
                      className="mr-2 size-4"
                    />
                    Try again
                  </Button>

                  <Button
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    className="rounded-sm px-6"
                    render={<Link href="/" />}
                  >
                    <HugeiconsIcon icon={ArrowLeft} className="mr-2 size-4" />
                    Back to homepage
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">
              Still having trouble?{" "}
              <Link
                href="/contact?type=bug"
                className="font-semibold text-primary hover:underline"
              >
                Report a problem to Tamworth Hub
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
