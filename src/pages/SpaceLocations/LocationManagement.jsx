import { React, useState } from 'react';

import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

import {
  Button, ConfirmationDialog, TextAreaInput, TextInput, ToggleSwitch,
} from 'src/components/inputs';
import { LocationInformationMap } from 'src/components/maps';
import { Divider, Heading } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';
import locationsService from 'src/services/locations';
import notificationHelper from 'src/utils/notificationHelper';

const LocationManagement = () => {
  const { locationId } = useParams();
  const {
    spaceData, locationsData, updateSelectedSpaceRoot, errorHandler,
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
      updateSelectedSpaceRoot();
      setIsEditable(!isEditable);
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

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
      updateSelectedSpaceRoot();
      navigate('..');
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

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
              text="Ver en el Mapa"
              isTypeButton
              onClick={() => setIsMapOpen(true)}
              color="gray"
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

        {(isConDiaOpen) && (
          <ConfirmationDialog
            title="Eliminar Ubicación del Espacio"
            description={`Estas seguro de querer eliminar la ubicación "${name}"?`}
            onDecline={{ text: 'Cancelar', action: () => setIsConDiaOpen(false) }}
            onConfirm={{ text: 'Eliminar', action: () => handleRemove() }}
          />
        )}
      </div>

      {(!isScreenSmall) && (
        <LocationInformationMap
          marker={selectedLocation}
          markerColor={spaceData.color}
        />
      )}

      {(isScreenSmall) && (isMapOpen) && (
        <div className="absolute size-full">
          <LocationInformationMap
            marker={selectedLocation}
            markerColor={spaceData.color}
            isScreenSmall={isScreenSmall}
            closeLocationMap={() => setIsMapOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default LocationManagement;
