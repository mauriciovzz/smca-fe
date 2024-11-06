import { React, useState } from 'react';

import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

import {
  Button, ConfirmationDialog, TextAreaInput, TextInput, ToggleSwitch,
} from 'src/components/inputs';
import { MapBase } from 'src/components/maps';
import { Divider, Heading } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';
import locationsService from 'src/services/locations';
import notificationHelper from 'src/utils/notificationHelper';

const LocationInMap = ({ coordinates, isScreenSmall, closeLocationMap }) => (
  <div className="flex size-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow">
    <Heading text="Posición en el Mapa" />
    <Divider />

    <div className="relative flex size-full flex-col space-y-5 overflow-hidden">
      <div className="relative flex size-full overflow-hidden rounded-lg shadow">
        <MapBase
          markersQuantity="oneToShow"
          coordinates={coordinates}
          isNotFullScreen
        />
      </div>

      <div className="flex justify-between space-x-4">
        <TextInput
          id="lat"
          type="number"
          labelText="Latitud"
          value={coordinates.lat}
          disabled
        />
        <TextInput
          id="long"
          type="number"
          labelText="Longitud"
          value={coordinates.long}
          disabled
        />
      </div>

      {
        (isScreenSmall) && (
          <div className="h-fit w-full">
            <Button
              text="Regresar"
              isTypeButton
              onClick={() => closeLocationMap()}
              color="blue"
            />
          </div>
        )
      }
    </div>
  </div>
);

const LocationManagement = () => {
  const { locationId } = useParams();
  const {
    spaceData, locationsData, updateSpaceInstanceRoot, errorHandler,
  } = useOutletContext();
  const selectedLocation = locationsData.find((l) => l.location_id === parseInt(locationId, 10));
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [name, setName] = useState(selectedLocation.name);
  const [location, setLocation] = useState(selectedLocation.location);
  const [isVisible, setIsVisible] = useState(selectedLocation.is_visible);

  const setData = () => {
    setIsEditable(false);
    setIsConDiaOpen(false);

    setName(selectedLocation.name);
    setLocation(selectedLocation.location);
    setIsVisible(selectedLocation.is_visible);
  };

  const handleUpdate = async () => {
    try {
      const response = await locationsService.update(
        spaceData.space_id,
        selectedLocation.location_id,
        { name, location, isVisible },
      );

      notificationHelper.success(response);
      updateSpaceInstanceRoot();
      setIsEditable(!isEditable);
    } catch (error) {
      const goTo = errorHandler(error, updateSpaceInstanceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await locationsService.remove(
        spaceData.space_id,
        selectedLocation.location_id,
      );

      notificationHelper.success(response);
      updateSpaceInstanceRoot();
      navigate('..');
    } catch (error) {
      const goTo = errorHandler(error, updateSpaceInstanceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex size-full flex-col space-y-2.5 rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text="Ubicación"
            hasButton
            onButtonClick={() => navigate('..')}
          />

          <Divider />

          <form className="space-y-4">
            <TextInput
              id="name"
              type="text"
              labelText="Nombre"
              value={name}
              setValue={setName}
              disabled={!isEditable}
            />
            <TextAreaInput
              id="address"
              labelText="Dirección"
              value={location}
              setValue={(newValue) => setLocation(newValue)}
              disabled={!isEditable}
            />
            <ToggleSwitch
              labelText="Visibilidad"
              selectedOption={isVisible}
              leftOption={{
                title: 'Público',
                value: true,
                color: 'bg-main',
                onClick: () => setIsVisible(true),
              }}
              rigthOption={{
                title: 'Privado',
                value: false,
                color: 'bg-main',
                onClick: () => setIsVisible(false),
              }}
              isDisabled={!isEditable}
            />
          </form>
        </div>

        {
          (isScreenSmall) && (
            <Button
              text="Ver Posición en el Mapa"
              isTypeButton
              onClick={() => setIsMapOpen(true)}
              color="blue"
            />
          )
        }

        {
          (spaceData.is_admin) && (
            <div className="flex w-full gap-2.5">
              <Button
                text={isEditable ? 'Guardar' : 'Modificar'}
                isTypeButton
                onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
                color="blue"
              />
              <Button
                text={isEditable ? 'Cancelar' : 'Eliminar'}
                isTypeButton
                onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaOpen(true)}
                color="red"
              />
            </div>
          )
        }

        {
          isConDiaOpen && (
          <ConfirmationDialog
            title="Eliminar Ubicación del Espacio"
            description={`Estas seguro de querer eliminar la ubicación "${name}"?`}
            onDecline={{ text: 'Cancelar', action: () => setIsConDiaOpen(false) }}
            onConfirm={{ text: 'Eliminar', action: () => handleRemove() }}
          />
          )
        }
      </div>

      {
        (!isScreenSmall) && (
          <LocationInMap coordinates={{ lat: selectedLocation.lat, long: selectedLocation.long }} />
        )
      }

      {
        (isScreenSmall) && (isMapOpen) && (
          <div className="absolute size-full">
            <LocationInMap
              coordinates={{ lat: selectedLocation.lat, long: selectedLocation.long }}
              isScreenSmall={isScreenSmall}
              closeLocationMap={() => setIsMapOpen(false)}
            />
          </div>
        )
      }
    </div>
  );
};

export default LocationManagement;
