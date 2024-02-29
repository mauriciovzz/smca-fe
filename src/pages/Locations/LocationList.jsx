import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon, nodeIcon } from 'src/assets';
import {
  Button, Divider, Heading, Map,
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

  const isTakenBadge = (taken) => (
    taken
      ? (
        <div className="h-[20px] w-[20px] rounded-full bg-red-500" />
      )
      : (
        <div className="h-[20px] w-[20px] rounded-full bg-green-500" />
      )
  );

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
                    alt="add user"
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
                          <div className="text-left font-medium">
                            {location.name}
                          </div>
                          <div className="text-left text-xs font-medium text-gray-500">
                            {location.location}
                          </div>
                        </div>
                        <div className="h-full w-[20px] self-center">
                          {isTakenBadge(location.is_taken)}
                        </div>
                      </button>
                    </li>
                  ))
              }
            </ul>
          </div>
          {
            (isScreenSM) && (
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="flex items-center justify-center space-x-2.5 pt-5"
              >
                <div className="font-medium">
                  Buscar ubicación en el mapa
                </div>
                <img
                  src={nodeIcon}
                  alt="node icon"
                  className="h-[34px] w-[34px]"
                />
              </button>
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
