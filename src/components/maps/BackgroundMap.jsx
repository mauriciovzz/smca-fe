import React from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';

import { BlurEffect } from 'src/components/ui';

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const BackgroundMap = () => (
  <>
    <BlurEffect index="z-10" />
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      zoomControl={false}
      minZoom={12}
      maxBounds={[southWestBound, northEastBound]}
      maxBoundsViscosity={0.75}
      scrollWheelZoom
      attributionControl={false}
      className="fixed top-0 z-0 size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </>
);

export default BackgroundMap;
