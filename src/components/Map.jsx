import { React, useRef, useMemo } from 'react';

import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, ZoomControl,
} from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks';

import { blueMarker, markerShadow } from 'src/assets';

const icon = new L.Icon({
  iconUrl: blueMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const getPos = (coordinate, type) => {
  if (type === 'lat') {
    if (coordinate < southWestBound[0]) return southWestBound[0];
    if (coordinate > northEastBound[0]) return northEastBound[0];
    return coordinate;
  }

  if (coordinate < southWestBound[1]) return southWestBound[1];
  if (coordinate > northEastBound[1]) return northEastBound[1];
  return coordinate;
};

const RecenterAutomatically = ({ recenter }) => {
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

const Map = ({
  markerList, onMarkerClick, markerPopup, markersQuantity,
  coordinates, setCoordenates, recenter,
  zoomControl, isNotFullScreen,
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

  const populateMap = () => {
    switch (markersQuantity) {
      case 'many':
        return (
          markerList.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.long}`}
              icon={icon}
              position={[marker.lat, marker.long]}
              eventHandlers={{
                click: () => onMarkerClick(marker),
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              <Popup minWidth="250" closeButton={false}>
                {markerPopup(marker)}
              </Popup>
            </Marker>
          ))
        );
      case 'one':
        return (
          <>
            <Marker
              icon={icon}
              draggable
              eventHandlers={eventHandlers}
              position={[coordinates.lat, coordinates.long]}
              ref={markerRef}
            />
            <RecenterAutomatically recenter={recenter} />
            <MapEvents setCoordenates={setCoordenates} />
          </>
        );
      case 'oneToShow':
        return (
          <Marker
            icon={icon}
            position={[coordinates.lat, coordinates.long]}
          />
        );
      default:
        return (null);
    }
  };

  return (
    <MapContainer
      center={(markersQuantity === 'oneToShow') ? [coordinates.lat, coordinates.long] : mapCenter}
      zoom={(markersQuantity === 'oneToShow') ? '18' : mapZoom}
      zoomControl={false}
      minZoom={12}
      maxBounds={[southWestBound, northEastBound]}
      maxBoundsViscosity={0.75}
      scrollWheelZoom
      attributionControl={false}
      className={`${!isNotFullScreen && 'fixed top-0 '} z-0 h-full w-full`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markersQuantity && zoomControl && <ZoomControl position="bottomright" />}

      {populateMap()}
    </MapContainer>
  );
};

export default Map;
