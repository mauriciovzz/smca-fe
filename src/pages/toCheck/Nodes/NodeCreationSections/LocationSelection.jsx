import { React, useState } from 'react';

import { addIcon } from 'src/assets';
import {
  Button, Divider, MapBase, SelectionBar, MarkersMapButton,
} from 'src/components';
import LocationCreation from 'src/pages/Locations/LocationCreation';

const MarkersMap = ({
  locations, selectLocation, isScreenSM, changeView,
}) => (
  <div className="flex size-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex size-full overflow-hidden rounded-lg shadow">
      <MapBase
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
            isTypeButton
            onClick={() => changeView()}
            color="blue"
          />
        </div>

      )
    }
  </div>
);

const LocationSelection = ({
  locations, updateLocations, selectedLocation, setLocation, leftButtonClick, rightButtonClick,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocCreOpen, setIsLocCreOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  const selectMarker = (location) => {
    setLocation(location);
    setIsMapOpen(false);
  };

  return (
    <div className="relative flex size-full flex-col rounded-lg border bg-white p-2.5">
      <SelectionBar
        leftAction={leftButtonClick}
        text="Selecionar Ubicación"
        rightAction={rightButtonClick}
      />

      <Divider changePadding="p-[5px]" />

      <div className="flex size-full flex-col">
        <div className="relative size-full">
          <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
            {
              locations
                .map((location) => (
                  <li
                    key={location.lat + location.long}
                    className={`${location.location_id === selectedLocation.location_id ? 'bg-sky-200' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-5 shadow`}
                  >
                    <button
                      type="button"
                      onClick={() => setLocation(location)}
                      className="flex h-fit w-full space-x-5"
                    >
                      <div className="flex size-full flex-col">
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
            <MarkersMapButton
              text="Buscar ubicación en el mapa"
              onClick={() => setIsMapOpen(true)}
            />
          )
        }
      </div>

      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute left-0 top-0 size-full">
            <MarkersMap
              locations={locations}
              selectLocation={selectMarker}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>

        )
      }

      {
        isLocCreOpen && (
          <div className="absolute left-0 top-0 size-full">
            <LocationCreation
              updateLocations={() => updateLocations()}
              changeView={() => setIsLocCreOpen(false)}
            />
          </div>
        )
       }
    </div>
  );
};

export default LocationSelection;
