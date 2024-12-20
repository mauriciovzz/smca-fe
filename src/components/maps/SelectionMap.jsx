import { React, useRef, useMemo } from 'react';

import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, ZoomControl,
} from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks';

import { regularMarker } from 'src/assets';
import { Button } from 'src/components/inputs';

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const createMarker = (markerColor) => {
  const marker = L.divIcon({
    className: 'marker',
    html: regularMarker(markerColor || '#0284C7'),
    iconSize: [42, 60],
    iconAnchor: [42 / 2, 60],
    popupAnchor: [2, -62.5],
  });

  return marker;
};

const getPos = (coordinate, type) => {
  if (type === 'lat') {
    if (coordinate < southWestBound[0])
      return southWestBound[0];

    if (coordinate > northEastBound[0])
      return northEastBound[0];

    return coordinate;
  }

  if (coordinate < southWestBound[1])
    return southWestBound[1];

  if (coordinate > northEastBound[1])
    return northEastBound[1];

  return coordinate;
};

const Recenter = ({ recenter }) => {
  const map = useMap();

  if (recenter) {
    map.setView(mapCenter, mapZoom);
  }
  return null;
};

const MapEvents = ({ setCoordenates }) => {
  useMapEvents({
    click(e) {
      setCoordenates({
        lat: getPos(e.latlng.lat.toFixed(6), 'lat'),
        long: getPos(e.latlng.lng.toFixed(6), 'long'),
      });
    },
  });

  return false;
};

const SelectionMap = ({
  coordinates, setCoordenates, recenter,
  markerColor,
  isScreenSmall, closeSelectionMap,
}) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const currentMarker = markerRef.current;

        if (currentMarker != null) {
          setCoordenates({
            lat: getPos(currentMarker.getLatLng().lat.toFixed(6), 'lat'),
            long: getPos(currentMarker.getLatLng().lng.toFixed(6), 'long'),
          });
        }
      },
    }),
    [],
  );

  return (
    <div className="flex size-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
      <div className="relative flex size-full overflow-hidden rounded-lg shadow">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          zoomControl={false}
          minZoom={12}
          maxBounds={[southWestBound, northEastBound]}
          maxBoundsViscosity={0.75}
          scrollWheelZoom
          attributionControl={false}
          className="z-0 size-full rounded-lg border-2"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            icon={createMarker(markerColor)}
            draggable
            eventHandlers={eventHandlers}
            position={[coordinates.lat, coordinates.long]}
            ref={markerRef}
          />
          <Recenter recenter={recenter} />
          <MapEvents setCoordenates={setCoordenates} />
          {!isScreenSmall && <ZoomControl position="bottomright" />}
        </MapContainer>
      </div>

      {(isScreenSmall) && (
        <div className="h-fit w-full">
          <Button
            text="Regresar"
            isTypeButton
            onClick={() => closeSelectionMap()}
            color="blue"
          />
        </div>
      )}
    </div>
  );
};

export default SelectionMap;
