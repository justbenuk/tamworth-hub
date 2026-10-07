import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import PageContainer from "@/components/Shared/PageContainer";
import HomeSidebar from "@/components/Sidebars/HomeSidebar";
import Image from "next/image";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <MainHeader />
      <PageContainer className="space-y-10">
        <div className="h-full lg:pt-20 pb-20 bg-primary xl:mt-10 xl:rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-10">
            <div className=" flex flex-col justify-center space-y-4 py-10 text-center lg:text-start">
              <h1 className="lg:w-3/4 text-5xl lg:text-6xl text-secondary font-semibold">
                Connect. Share. Grow. {""}
                <span className="text-pink-600 font-bold">Together</span>
              </h1>
              <p className="text-primary-foreground">
                Tamworth Hub is for the community to help bring local people
                together with local businesses, Events, Jobs and thing&apos;s to
                do.
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
        </div>
        <div className="border h-25">advert</div>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-10 py-10 w-full">
          <div className="col-span-1 lg:col-span-6">{children}</div>
          <div className="col-span-1 lg:col-span-2">
            <HomeSidebar />
          </div>
        </div>
        <div className="border h-25">advert</div>
      </PageContainer>
      <MainFooter />
    </div>
  );
}
