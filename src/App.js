import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import sampleData from './sampleData';

import clapperIcon from './images/clapboard-g163cd4bec_640.png';

const clapper = new L.Icon({
  iconUrl: clapperIcon,
  iconSize: [25, 25]
});

export const App = () => {
  const startingPosition = [0, -25];

  return (
    <MapContainer center={startingPosition} zoom={2}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {sampleData.map((movie) => (
        <Marker
          key={movie.id}
          position={[movie.lat, movie.lng]}
          icon={clapper} />
      ))}
    </MapContainer>
  );
};