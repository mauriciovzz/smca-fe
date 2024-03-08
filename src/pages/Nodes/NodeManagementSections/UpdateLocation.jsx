import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon, nodeIcon } from 'src/assets';
import {
  Button, Divider, Heading, Map,
} from 'src/components';
import LocationCreation from 'src/pages/Locations/LocationCreation';
import locationsService from 'src/services/locations';
import notifications from 'src/utils/notifications';

const MarkersMap = ({
  locations, selectLocation, isScreenSM, changeView,
}) => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex h-full w-full overflow-hidden rounded-lg shadow">
      <Map
        markerList={locations}
        onMarkerClick={selectLocation}
        markerPopup={
          (location) => (
            <>
              <b>{location.name}</b>
              <br />
              {location.address}
            </>
          )
        }
        markersQuantity="many"
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

const LocationSelection = ({ nodeLocation, selectLocation, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocCreOpen, setIsLocCreOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  const [freeLocations, setFreeLocations] = useState([]);

  const getLocations = async () => {
    try {
      const locations = await locationsService.getAll(selectedWorkspace.workspace_id);
      setFreeLocations(locations.filter((location) => !location.is_taken));
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const selectMarker = (location) => {
    selectLocation(location);
    setIsMapOpen(false);
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-5">
      <Heading
        text="Actualizar Ubicación"
        hasButton
        onButtonClick={() => changeView('ManagementMenu')}
      />

      <Divider />

      <div className="flex h-full w-full flex-col space-y-5">
        <div className="relative h-full w-full">
          <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
            {
              freeLocations
                .map((location) => (
                  <li
                    key={location.lat + location.long}
                    className={`${location.location_id === nodeLocation ? 'bg-sky-200' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-5 shadow`}
                  >
                    <button
                      type="button"
                      onClick={() => selectLocation(location)}
                      className="flex h-fit w-full space-x-5"
                    >
                      <div className="flex h-full w-full flex-col">
                        <div className="text-left font-medium">
                          {location.name}
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500">
                          {location.location}
                        </div>
                      </div>
                    </button>
                  </li>
                ))
            }
            <li className="h-fit w-full border-b bg-white px-5 py-2.5 shadow hover:bg-slate-100">
              <button
                type="button"
                onClick={() => setIsLocCreOpen(true)}
                className="flex w-full items-center justify-center space-x-2.5"
              >
                <img
                  src={addIcon}
                  alt="add icon"
                />
                <div>Agregar Ubicación</div>
              </button>
            </li>
          </ul>
        </div>
        {
          (isScreenSM) && (
            <button
              type="button"
              onClick={() => setIsMapOpen(true)}
              className="flex items-center justify-center space-x-1.5 pb-5"
            >
              <div className="text-sm font-medium">
                Buscar ubicación en el mapa
              </div>
              <img
                src={nodeIcon}
                alt="node icon"
                className="h-[28px] w-[28px]"
              />
            </button>
          )
        }
      </div>

      <Button
        text="Guardar Cambios"
        typeIsButton
        onClick={undefined}
        color="blue"
      />
      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute left-0 top-0 h-full w-full">
            <MarkersMap
              locations={freeLocations}
              selectLocation={selectMarker}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>

        )
      }

      {
        isLocCreOpen && (
          <div className="absolute left-0 top-0 h-full w-full">
            <LocationCreation
              updateLocations={() => getLocations()}
              changeView={() => setIsLocCreOpen(false)}
            />
          </div>
        )
       }
    </div>
  );
};

export default LocationSelection;
