import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapPin {
  id: string;
  name: string;
  category: 'main' | 'attraction' | 'food' | 'hotel' | 'hospital' | 'police';
  coordinates: [number, number];
  description?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  pins?: MapPin[];
  height?: string;
  destinationName?: string;
}

export const LeafletMapComponent: React.FC<LeafletMapProps> = ({
  center,
  zoom = 13,
  pins = [],
  height = '320px',
  destinationName = 'Tamil Nadu',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icon issues in bundled Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Free, open OpenStreetMap tile layer (reliable, no API key needed)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }

    const map = mapInstanceRef.current;

    // Clear existing custom layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Add Main Destination Marker
    const mainIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #0d9488; color: white; border-radius: 9999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 3px solid white; font-weight: bold; font-size: 14px;">📍</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    L.marker(center, { icon: mainIcon })
      .addTo(map)
      .bindPopup(`<div style="font-family: inherit; font-size: 13px;"><strong>${destinationName}</strong><br/>Center Location</div>`);

    // Add additional pins
    pins.forEach((pin) => {
      let iconColor = '#0284c7';
      let iconEmoji = '🌟';

      if (pin.category === 'hospital') {
        iconColor = '#dc2626';
        iconEmoji = '🏥';
      } else if (pin.category === 'police') {
        iconColor = '#2563eb';
        iconEmoji = '👮';
      } else if (pin.category === 'food') {
        iconColor = '#ea580c';
        iconEmoji = '🍲';
      } else if (pin.category === 'hotel') {
        iconColor = '#8b5cf6';
        iconEmoji = '🏨';
      } else if (pin.category === 'attraction') {
        iconColor = '#059669';
        iconEmoji = '🏛️';
      }

      const pinIcon = L.divIcon({
        className: 'custom-pin-marker',
        html: `<div style="background-color: ${iconColor}; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.25); border: 2px solid white; font-size: 13px;">${iconEmoji}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker(pin.coordinates, { icon: pinIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit; font-size: 12px; max-width: 180px;">
            <strong style="color: #0f172a;">${pin.name}</strong>
            ${pin.description ? `<p style="margin: 4px 0 0; color: #475569;">${pin.description}</p>` : ''}
            <div style="margin-top: 6px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${pin.coordinates[0]},${pin.coordinates[1]}" target="_blank" rel="noopener noreferrer" style="color: #0d9488; text-decoration: underline; font-weight: 600;">
                Navigate ↗
              </a>
            </div>
          </div>
        `);
    });

    // Invalidate size on load to ensure smooth tiles inside modals/drawers
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      // Keep instance or cleanup on unmount
    };
  }, [center, zoom, pins, destinationName]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} />
      <div className="absolute top-2 right-2 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 shadow-sm border border-slate-200/80 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Interactive Map
      </div>
    </div>
  );
};
