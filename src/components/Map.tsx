import "leaflet/dist/leaflet.css";

import { FC, useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { Map as LeafletMap } from "leaflet";
import type { Place } from "../api/Place";

interface MapProps {
  place: Place | null;
}

const Map: FC<MapProps> = ({ place }) => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (place && mapRef.current) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <MapContainer
      ref={mapRef}
      center={[40.7, -74]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
};

export default Map;
