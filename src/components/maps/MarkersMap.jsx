import { React } from 'react';

import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';

import ZoomControl from './ZoomControl';

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const createMarkerPopUp = (markersType, marker) => {
  switch (markersType) {
    case 'location':
      return (
        <Popup minWidth="250" minHeight="150" closeButton={false} autoClose={false}>
          <div className="flex w-full flex-col gap-1 p-2.5">
            <div className="flex flex-col leading-none">
              <div className="text-sm font-bold">{marker.location_name}</div>
              <div className="text-xs">{marker.location}</div>
            </div>
          </div>
        </Popup>
      );
    case 'node':
      return (
        <Popup minWidth="250" minHeight="150" closeButton={false} autoClose={false}>
          <div className="flex w-full flex-col gap-1 p-2.5">
            <div className="flex flex-col leading-none">
              <div className="text-sm font-bold">{marker.node_name}</div>
              <div className="text-xs">{marker.location_name}</div>
            </div>
          </div>
        </Popup>
      );
    default:
      return null;
  }
};

const MarkersMap = ({
  markers,
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

          <ZoomControl rightPosition />

          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.long}`}
              position={[marker.lat, marker.long]}
              eventHandlers={{
                click: () => onMarkerClick(marker),
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              {createMarkerPopUp(markersType, marker)}
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
            color="green"
          />
        </div>
      )}
    </div>
  </div>
);

export default MarkersMap;
