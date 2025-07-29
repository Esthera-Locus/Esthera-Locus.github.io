import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Don't forget to import Leaflet's CSS

export default function AtlasPage() {
  const apiKey = "xfcrXKfMNocHqLR21b3x";
  const basemapUrl = `https://api.maptiler.com/maps/ocean/{z}/{x}/{y}.png?key=${apiKey}`;

  return (
    <div className="w-screen h-screen">
      <MapContainer
        center={[-7.7956, 110.3695]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url={basemapUrl}
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
        />
      </MapContainer>
    </div>
  );
}