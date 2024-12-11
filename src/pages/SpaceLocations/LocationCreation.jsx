import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { arrowIcon } from 'src/assets';
import { Button, TextAreaInput, TextInput } from 'src/components/inputs';
import { CoordinatesSelectionMap } from 'src/components/maps';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';
import notificationHelper from 'src/utils/notificationHelper';

const mapCenter = ['8.322376', '-62.689662'];

const LocationCreation = ({ onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const isScreenSmall = onClose ? true : useScreenWidth();
  const navigate = useNavigate();

  const { spaceData, updateLocationsData } = useOutletContext();

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [recenter, setRecenter] = useState(false);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordenates] = useState({ lat: mapCenter[0], long: mapCenter[1] });

  const handleLocationCreationSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.post(
        `/api/spaces/${spaceData.space_id}/locations`,
        {
          lat: coordinates.lat,
          long: coordinates.long,
          name,
          location,
        },
      );

      notificationHelper.success(response.data);

      setCoordenates({ lat: mapCenter[0], long: mapCenter[1] });
      setRecenter(true);
      setName('');
      setLocation('');

      updateLocationsData();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleWindowSize = () => {
    if (onClose)
      return 'relative grid size-full grid-cols-1 grid-rows-1 gap-5';

    return 'relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1';
  };

  return (
    <div className={handleWindowSize()}>
      <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text="Agregar Ubicación"
            hasButton
            onButtonClick={onClose ? () => onClose() : () => navigate('..')}
          />

          <Divider />

          <form onSubmit={handleLocationCreationSubmit} id="LocationCreationForm" className="space-y-5">
            {
              (isScreenSmall)
                ? (
                  <div className="flex justify-between space-x-4">
                    <div className="flex w-[90%] justify-between space-x-4">
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
                    <button
                      type="button"
                      className="w-[10%]"
                      onClick={() => setIsMapOpen(true)}
                    >
                      <img
                        src={arrowIcon}
                        alt="arrow"
                        className="size-[25px] rotate-180"
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

            <TextInput
              id="name"
              type="text"
              labelText="Nombre"
              value={name}
              setValue={setName}
              autoComplete="off"
            />
            <TextAreaInput
              id="address"
              labelText="Dirección"
              value={location}
              setValue={(newValue) => setLocation(newValue)}
            />
          </form>
        </div>

        <Button
          text="Agregar Ubicación"
          form="LocationCreationForm"
          color="blue"
        />
      </div>

      {(!isScreenSmall) && (
        <CoordinatesSelectionMap
          coordinates={coordinates}
          setCoordenates={setCoordenates}
          recenter={recenter}
          markerColor={spaceData.color}
        />
      )}

      {(isScreenSmall) && (isMapOpen) && (
        <div className="absolute size-full">
          <CoordinatesSelectionMap
            coordinates={coordinates}
            setCoordenates={setCoordenates}
            recenter={recenter}
            markerColor={spaceData.color}
            isScreenSmall={isScreenSmall}
            closeSelectionMap={() => setIsMapOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default LocationCreation;
