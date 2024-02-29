import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { nodeIcon } from 'src/assets';
import {
  Button, Divider, Heading, Label, Map, TextInput,
} from 'src/components';
import locationsService from 'src/services/locations';
import notifications from 'src/utils/notifications';

const mapCenter = ['8.322376', '-62.689662'];

const SelectionMap = ({
  coordinates, setCoordenates, recenter, isScreenSM, changeView,
}) => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex h-full w-full overflow-hidden rounded-lg shadow">
      <Map
        markersQuantity="one"
        coordinates={coordinates}
        setCoordenates={setCoordenates}
        recenter={recenter}
        zoomControl
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

const LocationCreation = ({ updateLocations, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordenates] = useState({ lat: mapCenter[0], long: mapCenter[1] });
  const [recenter, setRecenter] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await locationsService.create(
        selectedWorkspace.workspace_id,
        {
          name,
          location,
          lat: coordinates.lat,
          long: coordinates.long,
        },
      );

      notifications.success(response);
      setCoordenates({ lat: mapCenter[0], long: mapCenter[1] });
      setRecenter(true);
      setName('');
      setLocation('');
      updateLocations();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="relative grid h-full w-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text="Agregar Ubicación"
            hasButton
            onButtonClick={() => changeView()}
          />

          <Divider />

          <form onSubmit={handleSubmit} id="LocationCreationForm" className="space-y-5">
            <TextInput
              id="name"
              type="text"
              labelText="Nombre"
              value={name}
              setValue={setName}
              autoComplete="off"
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
                        {`[${coordinates.lat},${coordinates.long}]`}
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
                  <div className="flex justify-between space-x-4 ">
                    <TextInput
                      id="lat"
                      type="number"
                      disabled
                      labelText="Latitud"
                      value={coordinates.lat}
                      setValue={(newValue) => setCoordenates({ ...coordinates, lat: newValue })}
                    />
                    <TextInput
                      id="long"
                      type="number"
                      disabled
                      labelText="Longitud"
                      value={coordinates.long}
                      setValue={(newValue) => setCoordenates({ ...coordinates, long: newValue })}
                    />
                  </div>
                )
            }
          </form>
        </div>

        <Button
          text="Agregar Ubicación"
          form="LocationCreationForm"
          color="blue"
        />
      </div>

      {
        (!isScreenSM) && (
          <SelectionMap
            coordinates={coordinates}
            setCoordenates={setCoordenates}
            recenter={recenter}
          />
        )
      }

      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute h-full w-full">
            <SelectionMap
              coordinates={coordinates}
              setCoordenates={setCoordenates}
              recenter={recenter}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>

        )
      }
    </div>
  );
};

export default LocationCreation;
