import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, AddNewItemButton, ToggleSwitch } from 'src/components/inputs';
import { MarkersMap, LocationMap } from 'src/components/maps';
import { Label, Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import LocationCreation from 'src/pages/SpaceLocations/LocationCreation';
import notificationHelper from 'src/utils/notificationHelper';

const InfoItem = ({ text, value, width }) => (
  <div className={`${width} flex flex-col`}>
    <span className="text-xs font-bold">{text}</span>
    <span className="text-sm font-light">{value}</span>
  </div>
);

const ChangeLocation = ({ setView }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const {
    spaceData, selectedNode, updateNodesData, locationsData, updateLocationsData,
  } = useOutletContext();

  const freeLocations = locationsData.filter((loc) => !loc.is_taken);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocCreOpen, setIsLocCreOpen] = useState(false);

  const [location, setLocation] = useState(selectedNode.location_id);

  const handleLocationUpdate = async () => {
    try {
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}/location`,
        { location },
      );

      notificationHelper.success(response.data);
      updateLocationsData();
      updateNodesData();
      setView('CurrentLocation');
    } catch (error) {
      errorHandler(error);
    }
  };

  const selectMarker = (loc) => {
    setLocation(loc);
    setIsMapOpen(false);
  };

  return (
    <div className="relative flex size-full flex-col rounded-lg border bg-white p-5">
      <Heading
        text="Actualizar Ubicación"
        hasButton
        onButtonClick={() => navigate('..')}
      />

      <Divider />

      <div className="flex size-full flex-col gap-5">
        <div className="flex grow flex-col">
          <Label text="Ubicaciones Disponibles" />
          <div className="relative flex grow flex-col">
            <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
              {freeLocations.map((loc) => (
                <li
                  key={loc.location_id}
                  className={`${loc.location_id === location ? 'bg-main text-white' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-2.5 shadow`}
                >
                  <button
                    type="button"
                    onClick={() => setLocation(loc.location_id)}
                    className="flex h-fit w-full space-x-5 text-left"
                  >
                    <div className="flex size-full flex-col">
                      <div className="font-medium">
                        {loc.name}
                      </div>
                      <div className="text-xs">
                        {loc.location}
                      </div>
                    </div>
                  </button>
                </li>
              ))}

              <li
                className={`
                  ${location === null ? 'bg-main text-white' : 'bg-white hover:bg-slate-100'}
                   h-fit w-full border-b p-2.5 shadow
                `}
              >
                <button
                  type="button"
                  onClick={() => setLocation(null)}
                  className="flex h-fit w-full font-medium"
                >
                  sin ubicación
                </button>
              </li>

              <AddNewItemButton
                text="Agregar Ubicación"
                onClick={() => setIsLocCreOpen(true)}
              />
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Button
            text="Buscar Ubicación en el Mapa"
            isTypeButton
            onClick={() => setIsMapOpen(true)}
            color="gray"
          />

          <div className="flex gap-2.5">
            <Button
              text="Cancelar"
              isTypeButton
              onClick={() => setView('CurrentLocation')}
              color="red"
            />
            <Button
              text="Guardar Ubicación"
              isTypeButton
              onClick={() => handleLocationUpdate(true)}
              color="blue"
            />
          </div>
        </div>
      </div>

      {(isMapOpen) && (
        <div className="absolute left-0 top-0 size-full">
          <MarkersMap
            markers={freeLocations}
            markerColor={spaceData.color}
            markersType="location"
            isScreenSmall
            onMarkerClick={(l) => selectMarker(l.location_id)}
            closeMarkersMap={() => setIsMapOpen(false)}
          />
        </div>
      )}

      {(isLocCreOpen) && (
        <div className="absolute left-0 top-0 size-full">
          <LocationCreation onClose={() => setIsLocCreOpen(false)} />
        </div>
      )}
    </div>
  );
};

const CurrentLocation = ({ setView }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const {
    spaceData, selectedNode, updateNodesData, updateLocationsData,
  } = useOutletContext();

  const getDate = (dateString) => {
    const dateObject = new Date(dateString);
    return `${(`0${dateObject.getDate()}`).slice(-2)}-${(`0${dateObject.getMonth() + 1}`).slice(-2)}-${(`0${dateObject.getFullYear()}`).slice(-2)}`;
  };

  const handleVisibilityUpdate = async () => {
    try {
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/locations/${selectedNode.location_id}/visibility`,
      );

      notificationHelper.success(response.data);
      updateNodesData();
      updateLocationsData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="relative flex size-full flex-col rounded-lg border bg-white p-5">
      <Heading
        text="Ubicación Actual"
        hasButton
        onButtonClick={() => navigate('..')}
      />

      <Divider />

      <div className="flex grow">
        {
          (selectedNode.location_id)
            ? (
              <div className="flex grow flex-col gap-5">
                <div className="flex grow flex-col">
                  <div className="flex flex-col">
                    <div className="flex divide-x">
                      <InfoItem text="NOMBRE" width="w-2/3" value={selectedNode.location_name} />
                      <InfoItem text="VISIBILIDAD" width="w-1/3 pl-2.5" value={selectedNode.is_location_visible ? 'público' : 'privado'} />
                    </div>
                    <Divider changePadding="p-1.5" />

                    <div className="flex divide-x">
                      <InfoItem text="COORDENADAS" width="w-2/3" value={`[${selectedNode.lat}, ${selectedNode.long}]`} />
                      <InfoItem text="INICIO" width="w-1/3 pl-2.5" value={getDate(selectedNode.start_time_stamp)} />
                    </div>
                    <Divider changePadding="p-1.5" />
                  </div>

                  <LocationMap
                    marker={selectedNode}
                    markerColor={spaceData.color}
                    onlyMap
                  />

                  <Divider changePadding="p-1.5" />

                  <ToggleSwitch
                    labelText="Visibilidad"
                    selectedOption={selectedNode.is_visible}
                    leftOption={{
                      title: 'Público',
                      value: true,
                      color: 'bg-main',
                    }}
                    rigthOption={{
                      title: 'Privado',
                      value: false,
                      color: 'bg-main',
                    }}
                  />
                </div>

                <div className="flex gap-2.5">
                  <Button
                    text="Act. Visibilidad"
                    isTypeButton
                    onClick={() => handleVisibilityUpdate()}
                    color="blue"
                  />
                  <Button
                    text="Actualizar"
                    isTypeButton
                    onClick={() => setView('ChangeLocation')}
                    color="gray"
                  />
                </div>
              </div>
            )
            : (
              <div className="flex grow flex-col gap-5">
                <div className="flex grow items-center justify-center font-semibold">
                  El nodo no posee una ubicación.
                </div>

                <Button
                  text="Selecionar Ubicacion"
                  isTypeButton
                  onClick={() => setView('ChangeLocation')}
                  color="gray"
                />
              </div>
            )
        }
      </div>
    </div>
  );
};

const LocationSelection = () => {
  const [view, setView] = useState('CurrentLocation');

  const renderUpdateLocation = () => {
    switch (view) {
      case 'ChangeLocation':
        return <ChangeLocation setView={setView} />;
      default:
        return <CurrentLocation setView={setView} />;
    }
  };

  return (renderUpdateLocation());
};

export default LocationSelection;
