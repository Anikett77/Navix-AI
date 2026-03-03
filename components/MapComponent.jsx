"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapComponent({ markers = [] }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/hybrid-v4/style.json?key=zioNTKDHkolqin8fgpWk`,
      projection: "globe",
      center: [77.4126, 23.2599],
      zoom: 8,
    });

    mapRef.current = map;

    map.on("load", () => {
      let userInteracting = false;

      function rotateCamera() {
        if (!userInteracting) {
          map.rotateTo(map.getBearing() + 0.09, { duration: 0 });
        }
        requestAnimationFrame(rotateCamera);
      }

      rotateCamera();

      map.on("mousedown", () => (userInteracting = true));
      map.on("dragstart", () => (userInteracting = true));
      map.on("zoomstart", () => (userInteracting = true));
      map.on("mouseup",   () => (userInteracting = false));
      map.on("dragend",   () => (userInteracting = false));
      map.on("zoomend",   () => (userInteracting = false));
    });

    return () => map.remove();
  }, []);

  // ── Add / update markers whenever prop changes ─────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!markers || markers.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();

    markers.forEach(({ lng, lat, label, color = "#f97316", emoji = "📍" }) => {
      if (lat == null || lng == null) return;

      // Custom HTML pin
      const el = document.createElement("div");
      el.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
      `;
      el.innerHTML = `
        <div style="
          background: ${color};
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 99px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
        ">${emoji} ${label || ""}</div>
        <div style="
          width: 2px;
          height: 8px;
          background: ${color};
        "></div>
        <div style="
          width: 8px;
          height: 8px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 0 3px ${color}44;
        "></div>
      `;

      const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([lng, lat])
        .addTo(map);

      markersRef.current.push(marker);
      bounds.extend([lng, lat]);
    });

    // Fly to fit all markers
    if (markers.length === 1) {
      map.flyTo({ center: [markers[0].lng, markers[0].lat], zoom: 12, duration: 1500 });
    } else {
      map.fitBounds(bounds, { padding: 80, duration: 1500, maxZoom: 13 });
    }
  }, [markers]);

  return <div ref={mapContainer} className="w-full h-[89%] rounded-xl" />;
}