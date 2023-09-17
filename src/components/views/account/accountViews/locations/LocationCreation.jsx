import {
  React, useState, useRef, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import marker from 'src/assets/marker-icon.png';
import markerShadow from 'src/assets/marker-shadow.png';
import FormInput from 'src/components/FormInput';
import locationService from 'src/services/locations';

const icon = new L.Icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.322376, -62.689662];

const LocationCreation = ({ user }) => {
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [lat, setLat] = useState(mapCenter[0]);
  const [long, setLong] = useState(mapCenter[1]);
  const navigation = useNavigate();
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const mmarker = markerRef.current;
        if (mmarker != null) {
          setLat(mmarker.getLatLng().lat.toFixed(6));
          setLong(mmarker.getLatLng().lng.toFixed(6));
        }
      },
    }),
    [],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await locationService.create(
        user, { lat, long, locationName, locationAddress }
      );

      setLat(mapCenter[0]);
      setLong(mapCenter[1]);
      setLocationName('');
      setLocationAddress('');
    } catch (exception) {
      // console.log(exception);
    }
  };

  return (
    <div className="grid w-full grid-cols-2 gap-5">

      {/* Map */}
      <div className="flex w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            attributionControl={false}
            className="grow"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              icon={icon}
              draggable={true}
              eventHandlers={eventHandlers}
              position={[lat, long]}
              ref={markerRef}
            />
          </MapContainer>
        </div>
      </div>

      {/* Form */}
      <div className="flex w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
        <div className="relative basis-11/12">
          <div className="absolute flex h-full w-full flex-col space-y-4">

            <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
              Registrar Ubicacion
            </h1>

            <form id="locationForm" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

              <div className="flex justify-between space-x-4 ">
                <FormInput id="lat" type="number" labelName="Latitud" value={lat} setValue={setLat} />
                <FormInput id="long" type="number" labelName="Longitud" value={long} setValue={setLong} />
              </div>

              <FormInput id="locationName" type="text" labelName="Nombre" value={locationName} setValue={setLocationName} />

              <label htmlFor="locationAddress" className="block">
                <div className="mb-2 text-sm font-medium text-gray-900">
                  Dirección
                </div>
                <textarea
                  id="locationAddress"
                  name="locationAddress"
                  value={locationAddress}
                  onChange={({ target }) => setLocationAddress(target.value)}
                  rows="3"
                  required
                  className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 sm:text-sm"
                />
              </label>
            </form>
          </div>
        </div>

        <button
          type="submit"
          form="locationForm"
          className="basis-1/12 items-center justify-center rounded-lg bg-primary-600 font-medium text-white shadow hover:bg-primary-700"
        >
          Guardar Ubicacion
        </button>

      </div>

    </div>
  );
};

export default LocationCreation;
