import PageContainer from "@/components/PageContainer";
import { ReactNode } from "react";
import Image from "next/image";
import ContactCardList from "@/features/Contact/components/ContactCardList";
export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer className="py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <h1 className="text-page-title">Get in touch</h1>
          <p className="text-lead">
            Have a question, spotted something that needs fixing, or got an idea
            for Tamworth Hub? We&apos;d love to hear from you.
          </p>
          <div className="py-10">{children}</div>
        </div>
        <aside>
          <div className="bg-neutral-200">
            <Image
              src={"/images/tamworth-castle.jpg"}
              alt="castle"
              width={600}
              height={600}
              className="w-full"
            />
            <div className="py-4 px-6 grid space-y-2">
              <h5 className="text-primary">Our Community</h5>
              <p className="text-card-title">
                Your voice helps shape Tamworth Hub
              </p>
              <div className="border-b-4 border-primary h-4 w-12"></div>
              <p>
                Tamworth Hub is here for the local community, and your feedback
                helps us make it more useful, reliable and a enjoyable resource
                for everyone in Tamworth
              </p>
            </div>
          </div>
        </aside>
      </div>
      <ContactCardList />
    </PageContainer>
  );
}
