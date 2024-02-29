import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { nodeIcon } from 'src/assets';
import {
  Button, Divider, Heading, Label, Map, TextInput,
} from 'src/components';
import { ConfirmationDialog } from 'src/layout';
import locationsService from 'src/services/locations';
import notifications from 'src/utils/notifications';

const LocationInMap = ({ coordinates, isScreenSM, changeView }) => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex h-full w-full overflow-hidden rounded-lg shadow">
      <Map
        markersQuantity="oneToShow"
        coordinates={coordinates}
        isNotFullScreen
      />
    </div>
    {
      (isScreenSM) && (
        <div className="h-fit w-full">
          <Button
            text="Regresar"
            typeIsButton
            onClick={() => changeView()}
            color="blue"
          />
        </div>
      )
    }
  </div>
);

const LocationManagement = ({ selectedLocation, updateLocations, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [name, setName] = useState(selectedLocation.name);
  const [location, setLocation] = useState(selectedLocation.location);
  const [lat, setLat] = useState(selectedLocation.lat);
  const [long, setLong] = useState(selectedLocation.long);
  const locationCoordinates = { lat: selectedLocation.lat, long: selectedLocation.long };
  const isScreenSM = (window.innerWidth <= 640);

  const setData = () => {
    setIsEditable(false);
    setIsConDiaOpen(false);

    setName(selectedLocation.name);
    setLocation(selectedLocation.location);
    setLat(selectedLocation.lat);
    setLong(selectedLocation.long);
  };

  useEffect(() => {
    setData();
  }, [selectedLocation]);

  const handleUpdate = async () => {
    try {
      const response = await locationsService.update(
        selectedWorkspace.workspace_id,
        selectedLocation.location_id,
        { name, location },
      );

      notifications.success(response);
      updateLocations();
      setIsEditable(!isEditable);
    } catch (err) {
      notifications.error(err);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await locationsService.remove(
        selectedWorkspace.workspace_id,
        selectedLocation.location_id,
      );

      notifications.success(response);
      updateLocations();
      changeView();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="relative grid h-full w-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text="Ubicación"
            hasButton
            onButtonClick={() => changeView()}
          />

          <Divider />

          <form className="space-y-5">
            <TextInput
              id="name"
              type="text"
              labelText="Nombre"
              value={name}
              setValue={setName}
              disabled={!isEditable}
            />
            <label htmlFor="address" className="block">
              <div className="mb-2 text-sm font-medium text-gray-900">
                Dirección
              </div>
              <textarea
                id="address"
                name="address"
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                rows="3"
                required
                disabled={!isEditable}
                className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-sky-600 sm:text-sm"
              />
            </label>

            {
              (isScreenSM)
                ? (
                  <div className="flex justify-between">
                    <div>
                      <Label text="Coordenadas" />
                      <div className="flex space-x-5 text-sm">
                        {`[${lat},${long}]`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMapOpen(true)}
                    >
                      <img
                        src={nodeIcon}
                        alt="node icon"
                        className="h-[34px] w-[34px]"
                      />
                    </button>
                  </div>
                )
                : (
                  <div className="flex justify-between space-x-5">
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
                )
            }
          </form>
        </div>

        {
          (selectedWorkspace.is_admin) && (
            <div className="flex w-full gap-2.5">
              <Button
                text={isEditable ? 'Guardar' : 'Modificar'}
                typeIsButton
                onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
                color="blue"
              />
              <Button
                text={isEditable ? 'Cancelar' : 'Eliminar'}
                typeIsButton
                onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaOpen(true)}
                color="red"
              />
            </div>
          )
        }
      </div>

      {
        (!isScreenSM) && (
          <LocationInMap
            coordinates={locationCoordinates}
          />
        )
      }

      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute h-full w-full">
            <LocationInMap
              coordinates={locationCoordinates}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>

        )
      }

      {
        isConDiaOpen && (
        <ConfirmationDialog
          title="Eliminar Ubicación"
          description={`Estas seguro de querer eliminar la ubicación "${name}"?`}
          onDecline={() => setIsConDiaOpen(false)}
          onConfirm={() => handleRemove()}
        />
        )
      }
    </div>
  );
};

export default LocationManagement;
