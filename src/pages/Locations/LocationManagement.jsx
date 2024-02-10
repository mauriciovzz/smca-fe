import {
  React, useState,
} from 'react';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useNavigate, useOutletContext } from 'react-router-dom';

import {
  blueMarker, markerShadow,
} from 'src/assets';
import 'react-multi-carousel/lib/styles.css';
import Button from 'src/components/Button';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import TextInput from 'src/components/TextInput';
import Heading from 'src/components/Heading';
import locationService from 'src/services/locations';
import notifications from 'src/utils/notifications';

const icon = new L.Icon({
  iconUrl: blueMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const LocationManagement = () => {
  const { selectedLocation } = useOutletContext();
  const [locationName, setLocationName] = useState(selectedLocation.location_name);
  const [address, setAddress] = useState(selectedLocation.address);
  const [lat, setLat] = useState(selectedLocation.lat);
  const [long, setLong] = useState(selectedLocation.long);
  const [isConDiaModalOpen, setIsConDiaModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const mapCenter = [selectedLocation.lat, selectedLocation.long];
  const navigate = useNavigate();

  const setData = () => {
    setIsEditable(false);
    setLocationName(selectedLocation.location_name);
    setAddress(selectedLocation.address);
    setLat(selectedLocation.lat);
    setLong(selectedLocation.long);
  };

  const handleUpdate = async () => {
    try {
      await locationService.update({
        lat, long, locationName, address,
      });

      notifications.success(`Ubicacion "${locationName}" modificada.`);
      setIsEditable(!isEditable);
    } catch (exception) {
      notifications.error(exception);
    }
  };

  const handleRemove = async () => {
    try {
      await locationService.remove({ lat, long });
      notifications.success(`Ubicacion "${locationName}" eliminada`);
      setIsConDiaModalOpen(false);
      navigate('/cuenta/ubicaciones');
    } catch (exception) {
      notifications.error(exception);
    }
  };

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-5">
      <div className="flex h-full w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapContainer
            center={mapCenter}
            zoom={18}
            scrollWheelZoom={false}
            zoomControl={false}
            dragging={false}
            keyboard={false}
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

      <div className="flex h-full w-full flex-col gap-2.5 rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col gap-2.5">
          <Heading text="Gestionar Ubicacion" />

          <form className="flex flex-col gap-2.5 space-y-4 md:space-y-1">
            <div className="flex justify-between space-x-5 ">
              <TextInput
                id="lat"
                type="number"
                labelText="Latitud"
                value={lat}
                setValue={setLat}
                disabled
              />
              <TextInput
                id="long"
                type="number"
                labelText="Longitud"
                value={long}
                setValue={setLong}
                disabled
              />
            </div>

            <TextInput
              id="locationName"
              type="text"
              labelText="Nombre"
              value={locationName}
              setValue={setLocationName}
              disabled={!isEditable}
            />

            <label htmlFor="address" className="">
              <div className="mb-2 text-sm font-medium text-gray-900">
                Dirección
              </div>
              <textarea
                id="address"
                name="address"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                rows="3"
                disabled={!isEditable}
                required
                className={`${!isEditable ? 'bg-gray-100' : 'bg-gray-50'} w-full resize-none rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-sky-600 sm:text-sm`}
              />
            </label>
          </form>
        </div>

        <div className="flex w-full gap-x-2.5">
          <Button
            text={isEditable ? 'Guardar Cambios' : 'Modificar Ubicacion'}
            color="blue"
            onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
          />
          <Button
            text={isEditable ? 'Cancelar' : 'Eliminar Variable'}
            color="red"
            onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaModalOpen(true)}
          />
        </div>

        {
          isConDiaModalOpen && (
          <ConfirmationDialog
            title="Eliminar Ubicacion"
            description={`Estas seguro de querer eliminar la variable "${locationName}"?`}
            onDecline={() => setIsConDiaModalOpen(false)}
            onConfirm={() => handleRemove()}
          />
          )
        }
      </div>
    </div>
  );
};

export default LocationManagement;
