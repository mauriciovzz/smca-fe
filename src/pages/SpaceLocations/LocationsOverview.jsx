import { React, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { addIcon, privateLocationIcon, publicLocationIcon } from 'src/assets';
import { Button } from 'src/components/inputs';
import { MarkersMap } from 'src/components/maps';
import { Divider, Heading, LocationLabel } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';

const LocationsOverview = ({ locationsData, spaceData }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();

  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <div className="flex justify-between">
            <Heading text="Ubicaciones" />

            {
              (spaceData.is_admin) && (
                <Link className="self-start" to="agregar">
                  <img
                    src={addIcon}
                    alt="add icon"
                    className="size-[25px] sm:size-[36px]"
                  />
                </Link>
              )
            }
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
                        <Link
                          className="flex h-fit w-full space-x-5"
                          to={`${location.location_id}`}
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
                              {location.name}
                            </div>
                            <div className="text-left text-xs font-medium text-gray-500">
                              {location.location}
                            </div>
                          </div>
                        </Link>
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

      {
        (!isScreenSmall) && (
          <MarkersMap
            markers={locationsData}
            onMarkerClick={(l) => navigate(`${l.location_id}`)}
            markerPopUp={(l) => (
              <>
                <b>{l.name}</b>
                <br />
                {l.location}
              </>
            )}
          />
        )
      }

      {
        (isScreenSmall) && (isMapOpen) && (
          <div className="absolute size-full">
            <MarkersMap
              markers={locationsData}
              isScreenSmall={isScreenSmall}
              onMarkerClick={(location) => navigate(`${location.location_id}`)}
              markerPopUp={(l) => (
                <>
                  <b>{l.name}</b>
                  <br />
                  {l.location}
                </>
              )}
              closeMarkersMap={() => setIsMapOpen(false)}
            />
          </div>
        )
      }
    </div>
  );
};

export default LocationsOverview;
