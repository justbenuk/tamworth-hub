"use client";

import { useEffect, useMemo } from "react";
import type { Ward } from "@prisma/client";
import type { GeoJsonObject } from "geojson";
import { geoJSON, latLngBounds } from "leaflet";
import { CircleMarker, GeoJSON, Tooltip, useMap } from "react-leaflet";
import { Map, MapTileLayer, MapZoomControl } from "@/components/ui/map";

type Props = {
  wards: Ward[];
  selectedId: string;
  onSelectAction: (id: string) => void;
};

function WardLayers({ wards, selectedId, onSelectAction }: Props) {
  const map = useMap();
  const entries = useMemo(
    () =>
      wards.map((ward) => {
        let boundary: GeoJsonObject | null = null;
        const bounds = latLngBounds([]);
        try {
          const value =
            typeof ward.geoJson === "string"
              ? JSON.parse(ward.geoJson)
              : ward.geoJson;
          if (value && typeof value === "object" && "type" in value) {
            // Malformed geographic data falls back to the ward's location marker.
            const layer = geoJSON(value as GeoJsonObject);
            const boundaryBounds = layer.getBounds();
            if (boundaryBounds.isValid()) {
              boundary = value as GeoJsonObject;
              bounds.extend(boundaryBounds);
            }
          }
        } catch {
          // Older records may contain JSON that is not valid geographic data.
        }
        const hasLocation =
          Number.isFinite(ward.latitude) &&
          Number.isFinite(ward.longitude) &&
          Math.abs(ward.latitude) <= 90 &&
          Math.abs(ward.longitude) <= 180;
        if (!boundary && hasLocation)
          bounds.extend([ward.latitude, ward.longitude]);
        return { ward, boundary, bounds, hasLocation };
      }),
    [wards],
  );

  useEffect(() => {
    const bounds = latLngBounds([]);
    for (const entry of entries) {
      if (entry.bounds.isValid()) {
        bounds.extend(entry.bounds);
      }
    }
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        animate: false,
        padding: [32, 32],
        maxZoom: 15,
      });
    }
  }, [entries, map]);

  return entries.map(({ ward, boundary, hasLocation }) => {
    const selected = selectedId === ward.id;
    const style = {
      color: selected ? "#c2410c" : "#2563eb",
      weight: selected ? 4 : 2,
      fillColor: selected ? "#f97316" : "#3b82f6",
      fillOpacity: selected ? 0.4 : 0.15,
    };
    const eventHandlers = { click: () => onSelectAction(ward.id) };
    return boundary ? (
      <GeoJSON
        key={ward.id}
        data={boundary}
        style={style}
        eventHandlers={eventHandlers}
      >
        <Tooltip sticky>{ward.name}</Tooltip>
      </GeoJSON>
    ) : hasLocation ? (
      <CircleMarker
        key={ward.id}
        center={[ward.latitude, ward.longitude]}
        radius={selected ? 10 : 7}
        pathOptions={style}
        eventHandlers={eventHandlers}
      >
        <Tooltip>{ward.name} — boundary unavailable</Tooltip>
      </CircleMarker>
    ) : null;
  });
}

export default function WardMap(props: Props) {
  return (
    <Map
      center={[52.6339, -1.695]}
      zoom={12}
      className="z-0 h-[80dvh] rounded-2xl my-auto"
      attributionControl
      scrollWheelZoom={false}
    >
      <MapTileLayer />
      <MapZoomControl />
      <WardLayers {...props} />
    </Map>
  );
}
