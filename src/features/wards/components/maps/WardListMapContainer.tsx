"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Ward } from "@prisma/client";

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
  const [selectedId, setSelectedId] = useState("");
  const selected = wards.find((ward) => ward.id === selectedId);
  const sortedWards = [...wards].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Explore By Ward
        </h1>
        <p className="text-muted-foreground">
          Select a ward on the map to see its details below.
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
              onSelect={setSelectedId}
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
              onChange={(event) => setSelectedId(event.target.value)}
            >
              <option value="">All wards</option>
              {sortedWards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground">
              {wards.length} wards · Selected ward shown in orange
            </span>
          </div>
          <section
            aria-live="polite"
            aria-atomic="true"
            className="rounded-xl border bg-card p-6"
          >
            {selected ? (
              <>
                <p className="text-sm text-muted-foreground">Selected ward</p>
                <h2 className="mt-1 text-2xl font-semibold">{selected.name}</h2>
                <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["GSS code", selected.gss || "Not provided"],
                    ["Latitude", selected.latitude.toString()],
                    ["Longitude", selected.longitude.toString()],
                    [
                      "Boundary precision",
                      selected.precision || "Not provided",
                    ],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="mt-1 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <div className="py-6 text-center">
                <h2 className="text-xl font-semibold">Discover a ward</h2>
                <p className="mt-2 text-muted-foreground">
                  Click a boundary or marker, or choose a ward above to view its
                  details.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
