import { React } from 'react';

import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, ZoomControl,
} from 'react-leaflet';

import {
  indoorMarker, outdoorMarker, privateMarker, publicMarker, regularMarker,
} from 'src/assets';
import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const createMarker = (marker, markersType, markerColor) => {
  const MarkerConfig = () => {
    const color = () => {
      if (markerColor)
        return markerColor;

      if (markersType === 'node' && marker.is_visible)
        return '#0284c7';

      if (markersType === 'node' && marker.color)
        return marker.color;

      return '#0284c7';
    };

    switch (markersType) {
      case 'location':
        return (marker.is_visible) ? publicMarker(color()) : privateMarker(color());
      case 'node':
        return (marker.is_indoor) ? indoorMarker(color()) : outdoorMarker(color());
      default: return regularMarker(color());
    }
  };

  const icon = L.divIcon({
    className: 'marker',
    html: MarkerConfig(),
    iconSize: [42, 60],
    iconAnchor: [42 / 2, 60],
    popupAnchor: [2, -62.5],
  });

  return icon;
};

const createMarkerPopUp = (markersType, marker) => {
  switch (markersType) {
    case 'location':
      return (
        <>
          <b>{marker.name}</b>
          <br />
          {marker.location}
        </>
      );
    case 'node':
      return (
        <>
          <b>{marker.node_name}</b>
          <br />
          {marker.location_name}
        </>
      );
    default:
      return null;
  }
};

const MarkersMap = ({
  markers, markerColor,
  markersType,
  isScreenSmall, onMarkerClick, closeMarkersMap,
}) => (
  <div className="flex size-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow">
    {(isScreenSmall) && (
      <>
        <Heading text="Ubicaciones" />
        <Divider />
      </>
    )}

    <div className="relative flex size-full flex-col space-y-5 overflow-hidden">
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

          <ZoomControl position="bottomright" />

          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.long}`}
              icon={createMarker(marker, markersType, markerColor)}
              position={[marker.lat, marker.long]}
              eventHandlers={{
                click: () => onMarkerClick(marker),
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              <Popup minWidth="250" closeButton={false}>
                {createMarkerPopUp(markersType, marker)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {(isScreenSmall) && (
        <div className="h-fit w-full">
          <Button
            text="Regresar"
            isTypeButton
            onClick={() => closeMarkersMap()}
            color="blue"
          />
        </div>
      )}
    </div>
  </div>
);

export default MarkersMap;
