"use client";

import PageContainer from "@/components/PageContainer";
import type { Ward } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const WardMap = dynamic(() => import("./WardMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[80dvh] my-auto items-center justify-center bg-muted"
      role="status"
    >
      Loading ward map…
    </div>
  ),
});

export default function WardListMapContainer({ wards }: { wards: Ward[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("");
  const [isNavigating, startNavigation] = useTransition();

  function selectWard(id: string) {
    setSelectedId(id);

    const ward = wards.find((item) => item.id === id);
    if (!ward) return;

    startNavigation(() => {
      router.push(`/wards/${ward.slug}`);
    });
  }

  return (
    <PageContainer size="large">
      <WardMap
        wards={wards}
        selectedId={selectedId}
        onSelectAction={selectWard}
      />
    </PageContainer>
  );
}
