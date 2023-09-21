import { React, useState } from 'react';
import notifications from 'src/utils/notifications';
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

const LocationManagement = ({ location }) => {
  const [locationName, setLocationName] = useState(location.location_name);
  const [locationAddress, setLocationAddress] = useState(location.location_address);
  const [lat, setLat] = useState(location.lat);
  const [long, setLong] = useState(location.long);
  const [editState, setEditState] = useState(false);
  const mapCenter = [location.lat, location.long];
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      await locationService.update({
        lat, long, locationName, locationAddress,
      });

      notifications.success(`Ubicacion "${locationName}" modificada.`);
      setEditState(!editState);
    } catch (exception) {
      notifications.error(exception);
    }
  };

  const handleRemove = async () => {
    try {
      await locationService.remove({ lat, long });

      notifications.success(`Ubicacion "${locationName}" eliminada`);
      navigate('/cuenta/ubicaciones');
    } catch (exception) {
      notifications.error(exception);
    }
  };

  return (
    <div className="grid w-full grid-cols-2 gap-5">

      <div className="flex w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapContainer
            center={mapCenter}
            zoom={18}
            scrollWheelZoom={false}
            attributionControl={false}
            className="grow"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              icon={icon}
              position={mapCenter}
            />
          </MapContainer>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
        <div className="relative basis-11/12">
          <div className="absolute flex h-full w-full flex-col space-y-4">

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Ubicacion
            </h1>

            <form id="locationForm" className="space-y-4 md:space-y-6">

              <div className="flex justify-between space-x-4 ">
                <FormInput id="lat" type="number" labelName="Latitud" value={lat} setValue={setLat} disabled />
                <FormInput id="long" type="number" labelName="Longitud" value={long} setValue={setLong} disabled />
              </div>

              <FormInput id="locationName" type="text" labelName="Nombre" value={locationName} setValue={setLocationName} disabled={!editState} />

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
                  disabled={!editState}
                  required
                  className={`block w-full resize-none rounded-lg border border-gray-300 ${!editState ? 'bg-gray-100' : 'bg-gray-50'} p-2.5 text-gray-900 focus:border-primary-600 sm:text-sm`}
                />
              </label>
            </form>
          </div>
        </div>

        <div className="flex basis-1/12 space-x-5">
          {
            editState
              ? (
                <button
                  type="button"
                  onClick={() => handleUpdate()}
                  className="flex-1 items-center justify-center rounded-lg bg-primary-600 font-medium text-white shadow hover:bg-primary-700"
                >
                  Guardar Cambios
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={() => setEditState(!editState)}
                  className="flex-1 items-center justify-center rounded-lg bg-primary-600 font-medium text-white shadow hover:bg-primary-700"
                >
                  Modificar Ubicacion
                </button>
              )
          }

          <button
            type="button"
            onClick={() => handleRemove()}
            className="flex-1 items-center justify-center rounded-lg bg-red-600 font-medium text-white shadow hover:bg-red-500"
          >
            Eliminar Ubicacion
          </button>
        </div>
      </div>

    </div>
  );
};

export default LocationManagement;
