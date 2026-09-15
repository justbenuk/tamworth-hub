"use client";

import type { Ward } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const WardMap = dynamic(() => import("./WardMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-112 items-center justify-center bg-muted"
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
  const sortedWards = [...wards].sort((a, b) => a.name.localeCompare(b.name));

  function selectWard(id: string) {
    setSelectedId(id);

    const ward = wards.find((item) => item.id === id);
    if (!ward) return;

    startNavigation(() => {
      router.push(`/wards/${ward.slug}`);
    });
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Explore by ward
        </h1>
        <p className="text-muted-foreground">
          Select a ward to view its latest news, crime information, jobs and
          councillors.
        </p>
      </header>

      {wards.length === 0 ? (
        <div className="rounded-xl border p-8 text-muted-foreground">
          No wards have been added yet.
        </div>
      ) : (
        <>
          <div
            className="isolate overflow-hidden rounded-xl border"
            aria-label="Map of Tamworth wards"
          >
            <WardMap
              wards={wards}
              selectedId={selectedId}
              onSelectAction={selectWard}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="ward-selection" className="font-medium">
              Choose a ward
            </label>
            <select
              id="ward-selection"
              className="min-w-56 rounded-md border bg-background px-3 py-2"
              value={selectedId}
              disabled={isNavigating}
              onChange={(event) => selectWard(event.target.value)}
            >
              <option value="">Select a ward</option>
              {sortedWards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground" aria-live="polite">
              {isNavigating
                ? "Opening ward…"
                : `${wards.length} wards · Select a boundary to continue`}
            </span>
          </div>

          <div className="rounded-xl border border-dashed p-6 text-center">
            <h2 className="text-xl font-semibold">Discover your ward</h2>
            <p className="mt-2 text-muted-foreground">
              Click a boundary or marker on the map, or choose a ward from the
              list above.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
