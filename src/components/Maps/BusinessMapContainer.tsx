import {
  Map,
  MapMarker,
  MapTileLayer,
  MapZoomControl,
} from "@/components/ui/map";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function BusinessMapContainer({
  long,
  lat,
}: {
  long: number;
  lat: number;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight">Find us</h2>
            <p className="text-xs text-muted-foreground">Explore the area</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          Tamworth
        </span>
      </div>

      <div className="px-3">
        <div className="h-56 overflow-hidden rounded-xl ring-1 ring-border/60 sm:h-64 lg:h-56">
          <Map
            center={[lat, long]}
            zoom={16}
            className="z-0 h-full min-h-0 w-full rounded-xl"
          >
            <MapTileLayer />
            <MapZoomControl />
            <MapMarker position={[lat, long]} />
          </Map>
        </div>
      </div>

      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}#map=16/${lat}/${long}`}
        target="_blank"
        rel="noreferrer"
        className="mx-3 my-3 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>View larger map</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
      </a>
    </section>
  );
}
