import MainHeader from "@/components/Header/MainHeader";
import PageContainer from "@/components/Shared/PageContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <PageContainer className="flex flex-col items-center justify-center h-[80dvh]">
        <div className="grid gap-2 items-center justify-center text-center">
          <h1 className="text-6xl">OOOps!</h1>
          <h1 className="text-6xl">Page Not Found</h1>
          <p>
            This page doesn&apos;t exist or has been removed. We suggest you go
            back home
          </p>
          <div>
            <Button asChild variant={"default"}>
              <Link href={"/"}>Go Home</Link>
            </Button>
          </div>
        </div>
      </PageContainer>
      <footer></footer>
    </div>
  );
}
