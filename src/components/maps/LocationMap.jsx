import { React } from 'react';

import {
  MapContainer, TileLayer, Marker, ZoomControl,
} from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

import { TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const Recenter = ({ position }) => {
  const map = useMap();

  map.setView(position, 18);

  return null;
};

const InfoItem = ({ text, value, width }) => (
  <div className={`${width} flex flex-col`}>
    <span className="text-xs font-bold">{text}</span>
    <span className="text-sm font-light">{value}</span>
  </div>
);

const getDate = (dateString) => {
  const dateObject = new Date(dateString);
  return `${(`0${dateObject.getDate()}`).slice(-2)}-${(`0${dateObject.getMonth() + 1}`).slice(-2)}-${(`0${dateObject.getFullYear()}`).slice(-2)}`;
};

const Map = ({ marker }) => (
  <div className="relative flex grow overflow-hidden rounded-lg shadow">
    <MapContainer
      center={[marker.lat, marker.long]}
      zoom="18"
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
        position={[marker.lat, marker.long]}
      />
      <Recenter position={[marker.lat, marker.long]} />
      <ZoomControl position="bottomright" />
    </MapContainer>
  </div>
);

const LocationMap = ({
  marker, markerColor,
  onlyMap, longTitle, showLocationInfo,
  isScreenSmall, closeLocationMap,
}) => (
  !onlyMap
    ? (
      <div className="flex size-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow">
        {(isScreenSmall)
          ? (
            <Heading
              text={longTitle ? 'Ubicación en el Mapa' : 'Ubicación'}
              hasButton
              onButtonClick={() => closeLocationMap()}
            />
          )
          : (
            <Heading text={longTitle ? 'Ubicación en el Mapa' : 'Ubicación'} />
          )}

        <Divider changeBottomPadding={showLocationInfo ? 'p-1.5' : 'p-2.5'} />

        {(marker.location_id)
          ? (
            <div className="flex size-full flex-col">
              {(showLocationInfo) && (
                <>
                  <div className="flex divide-x">
                    <InfoItem text="NOMBRE" width="w-2/3" value={marker.location_name} />
                    <InfoItem text="VISIBILIDAD" width="w-1/3 pl-2.5" value={marker.is_location_visible ? 'publico' : 'privado'} />
                  </div>
                  <Divider changePadding="p-1.5" />

                  <div className="flex divide-x">
                    <InfoItem text="COORDENADAS" width="w-2/3" value={`[${marker.lat}, ${marker.long}]`} />
                    <InfoItem text="INICIO" width="w-1/3 pl-2.5" value={getDate(marker.start_time_stamp)} />
                  </div>
                  <Divider changePadding="p-1.5" />
                </>
              )}

              <div className="relative flex size-full flex-col space-y-5 overflow-hidden">
                {(!showLocationInfo) && (
                  <div className="flex justify-between space-x-5">
                    <TextInput
                      id="lat"
                      type="number"
                      labelText="Latitud"
                      value={marker.lat}
                      disabled
                    />
                    <TextInput
                      id="long"
                      type="number"
                      labelText="Longitud"
                      value={marker.long}
                      disabled
                    />
                  </div>
                )}

                <Map marker={marker} markerColor={markerColor} />
              </div>
            </div>
          )
          : (
            <div className="flex size-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
              <span>El nodo seleccionado no</span>
              <span>posee una ubicación</span>
            </div>
          )}
      </div>
    )
    : (
      <Map marker={marker} markerColor={markerColor} />
    )
);

export default LocationMap;
