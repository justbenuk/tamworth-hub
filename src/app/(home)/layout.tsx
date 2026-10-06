import MainHeader from "@/components/Header/MainHeader";
import PageContainer from "@/components/Shared/PageContainer";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <MainHeader />
      <div className="grow">
        <div className="bg-primary">
          <PageContainer className="flex flex-col justify-center h-full lg:pt-20 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className=" flex flex-col justify-center-center space-y-4 py-10 text-center lg:text-start">
                <h1 className="lg:w-3/4 text-5xl lg:text-7xl text-secondary font-semibold">
                  Connect. Share. Grow. {""}
                  <span className="text-pink-600 font-bold">Together</span>
                </h1>
                <p className="text-primary-foreground">
                  Tamworth Hub is for the community to help bring local people
                  together with local businesses, Events, Jobs and thing&apos;s
                  to do.
                </p>
              </div>
              <div className="order-first lg:order-last">
                <div className="flex flex-col items-center justify-center h-full">
                  <Image
                    src={"/assets/hero-nb.png"}
                    alt="hero"
                    width={600}
                    height={600}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </PageContainer>
        </div>
        <PageContainer className="grid gap-10 py-10">
          <div className="flex flex-row items-center justify-end">
            <div className="flex flex-row gap-4">
              <div>1</div>
              <div>2</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Card className="border">box</Card>
            <Card className="border">box</Card>
            <Card className="border">box</Card>
          </div>
          <div>{children}</div>
        </PageContainer>
      </div>
      <footer></footer>
    </div>
  );
}
