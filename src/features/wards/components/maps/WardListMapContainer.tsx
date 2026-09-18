"use client";

import PageContainer from "@/components/PageContainer";
import type { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FetchAllWardsAction } from "../../WardActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WardMap = dynamic(() => import("./WardMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[60dvh] my-auto items-center justify-center bg-muted"
      role="status"
    >
      Loading ward map…
    </div>
  ),
});

type WardsWCouncillors = Prisma.WardGetPayload<{
  include: {
    councillors: {
      include: {
        image: true;
      };
    };
  };
}>;

export default function WardListMapContainer() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [wards, setWards] = useState<WardsWCouncillors[]>([]);
  const [error, setError] = useState<string | null>();
  const [isNavigating, startNavigation] = useTransition();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const response = await FetchAllWardsAction();

      if (response.success) {
        setWards(response.data);
      } else {
        setError("Failed to fetch posts");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  function selectWard(id: string) {
    setSelectedId(id);

    const ward = wards.find((item) => item.id === id);
    if (!ward) return;

    startNavigation(() => {
      router.push(`/wards/${ward.slug}`);
    });
  }

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ward Map</CardTitle>
        <CardDescription>Click on the map to select a ward</CardDescription>
      </CardHeader>
      <CardContent>
        <WardMap
          wards={wards}
          selectedId={selectedId}
          onSelectAction={selectWard}
        />
      </CardContent>
    </Card>
  );
}
