import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import {
  Button, Divider, Heading, Map, MapViewButton,
} from 'src/components';
import LocationCreation from 'src/pages/Locations/LocationCreation';
import locationsService from 'src/services/locations';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import NodeSuccessMessage from '../NodeSuccessMessage';

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

const LocationList = ({
  selectedNode, location, freeLocations, setLocation, updateLocations, handleLocationUpdate,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocCreOpen, setIsLocCreOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  const selectMarker = (newLocation) => {
    setLocation(newLocation.location_id);
    setIsMapOpen(false);
  };

  return (
    <>
      <div className="flex grow flex-col">
        <div className="relative h-full w-full">
          <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
            {
              freeLocations
                .map((loc) => (
                  <li
                    key={loc.lat + loc.long}
                    className={`${loc.location_id === location ? 'bg-sky-200' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-5 shadow`}
                  >
                    <button
                      type="button"
                      onClick={() => setLocation(loc.location_id)}
                      className="flex h-fit w-full space-x-5"
                    >
                      <div className="flex h-full w-full flex-col">
                        <div className="text-left font-medium">
                          {loc.name}
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500">
                          {loc.location}
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
          (isScreenSM)
            ? (
              <MapViewButton
                text="Buscar ubicación en el mapa"
                onClick={() => setIsMapOpen(true)}
                padding="py-2.5"
              />
            )
            : (
              <div className="pt-5" />
            )
        }
      </div>

      <Button
        text="Guardar Cambios"
        typeIsButton
        onClick={() => handleLocationUpdate()}
        color="blue"
        disabled={selectedNode.location_id === location}
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
              updateLocations={() => updateLocations()}
              changeView={() => setIsLocCreOpen(false)}
            />
          </div>
        )
      }
    </>
  );
};

const LocationSelection = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [freeLocations, setFreeLocations] = useState([]);
  const [location, setLocation] = useState(selectedNode.location_id);

  const getLocations = async () => {
    try {
      const locations = await locationsService.getAll(selectedWorkspace.workspace_id);
      setFreeLocations(locations
        .filter((l) => !l.is_taken || l.location_id === selectedNode.location_id));
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const handleLocationUpdate = async () => {
    try {
      await nodesService.updateLocation(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
        { locationId: location },
      );

      updateNodes();
      setView('NodeSuccessMessage');
    } catch (err) {
      notifications.error(err);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'NodeSuccessMessage':
        return (
          <NodeSuccessMessage
            title="Actualizacion Exitosa"
            close={() => changeView('ManagementMenu')}
          />
        );
      default:
        return (
          <LocationList
            selectedNode={selectedNode}
            location={location}
            freeLocations={freeLocations}
            setLocation={setLocation}
            updateLocations={() => getLocations()}
            handleLocationUpdate={() => handleLocationUpdate()}
          />
        );
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-5">
      <Heading
        text="Actualizar Ubicación"
        hasButton
        onButtonClick={() => changeView('ManagementMenu')}
      />

      <Divider />

      {renderView()}
    </div>
  );
};

export default LocationSelection;
