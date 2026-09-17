import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import Stats from "@/features/portal/components/Stats";

export const metadata: Metadata = {
  title: "Portal",
};

export default function PortalPage() {
  return (
    <PageContainer size="large" className="py-10">
      <div className="grid gap-6">
        <Stats />
      </div>
    </PageContainer>
  );
}
