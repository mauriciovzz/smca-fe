import { React, useState } from 'react';

import { privateLocationIcon, publicLocationIcon } from 'src/assets';
import { Button } from 'src/components/inputs';
import { MarkersMap } from 'src/components/maps';
import { Divider, Heading, LocationLabel } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';

const ReportsOverview = ({ locationsData, selectLocation }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isScreenSmall = useScreenWidth();

  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <div className="flex justify-between">
            <Heading text="Ubicaciones Disponibles" />
          </div>

          <Divider />

          <div className="relative flex size-full flex-col space-y-5 overflow-hidden">
            <div className="relative flex grow">
              <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                {
                  locationsData
                    .map((location) => (
                      <li
                        key={location.location_id}
                        className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                      >
                        <button
                          type="button"
                          className="flex h-fit w-full space-x-5"
                          onClick={() => selectLocation(location)}
                        >
                          <div className="size-fit self-center">
                            <img
                              src={location.is_visible ? publicLocationIcon : privateLocationIcon}
                              alt={location.is_visible ? 'publicaLocationIcon' : 'privateLocationIcon'}
                              className="size-[25px]"
                            />
                          </div>

                          <div className="flex size-full flex-col">
                            <LocationLabel location={location} />

                            <div className="break-words text-left font-medium">
                              {location.location_name}
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

            {(isScreenSmall) && (
              <Button
                text="Buscar Ubicación en el Mapa"
                isTypeButton
                onClick={() => setIsMapOpen(true)}
                color="blue"
              />
            )}
          </div>
        </div>
      </div>

      {(!isScreenSmall) && (
        <MarkersMap
          markers={locationsData}
          markersType="location"
          onMarkerClick={(location) => selectLocation(location)}
        />
      )}

      {(isScreenSmall) && (isMapOpen) && (
        <div className="absolute size-full">
          <MarkersMap
            markers={locationsData}
            markersType="location"
            isScreenSmall={isScreenSmall}
            onMarkerClick={(location) => selectLocation(location)}
            closeMarkersMap={() => setIsMapOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ReportsOverview;
