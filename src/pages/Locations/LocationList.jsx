import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import {
  Button, Divider, Heading, LocationTakenLabel, Map, MapViewButton,
} from 'src/components';

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

const LocationList = ({ locations, selectLocation, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  return (
    <div className="relative grid h-full w-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <div className="flex justify-between">
            <Heading text="Ubicaciones" />

            {
              (selectedWorkspace.is_admin) && (
                <button
                  type="button"
                  onClick={() => changeView()}
                  className="self-start"
                >
                  <img
                    src={addIcon}
                    alt="add icon"
                    className="h-[25px] w-[25px] sm:h-[36px] sm:w-[36px]"
                  />
                </button>
              )
            }
          </div>

          <Divider />

          <div className="relative h-full w-full">
            <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
              {
                locations
                  .map((location) => (
                    <li
                      key={location.lat + location.long}
                      className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                    >
                      <button
                        type="button"
                        onClick={() => selectLocation(location)}
                        className="flex h-fit w-full space-x-5"
                      >
                        <div className="flex h-full w-full flex-col">
                          <LocationTakenLabel isTaken={location.is_taken} />
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
            </ul>
          </div>
          {
            (isScreenSM) && (
              <MapViewButton
                text="Buscar ubicación en el mapa"
                onClick={() => setIsMapOpen(true)}
              />
            )
          }
        </div>
      </div>

      {
        (!isScreenSM) && (
          <MarkersMap
            locations={locations}
            selectLocation={selectLocation}
          />
        )
      }

      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute h-full w-full">
            <MarkersMap
              locations={locations}
              selectLocation={selectLocation}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>

        )
      }
    </div>
  );
};

export default LocationList;
