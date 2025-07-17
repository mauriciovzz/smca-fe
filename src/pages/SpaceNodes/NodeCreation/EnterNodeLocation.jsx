import { React, useState } from 'react';

import { AddNewItemButton, Button, SelectionBar } from 'src/components/inputs';
import { MarkersMap } from 'src/components/maps';
import LocationCreation from 'src/pages/SpaceLocations/LocationCreation';

const EnterNodeLocation = ({
  spaceLocationsData, spaceData,
  selectedLocation, selectLocation,
  previousPage, nextPage,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocCreOpen, setIsLocCreOpen] = useState(false);

  const selectMarker = (location) => {
    selectLocation(location);
    setIsMapOpen(false);
  };

  return (
    <div className="flex size-full flex-col gap-2.5 bg-white sm:gap-5">
      <SelectionBar
        text="Selecionar Ubicación"
        leftAction={previousPage}
        rightAction={nextPage}
      />

      <div className="flex size-full flex-col gap-2.5 sm:gap-5">
        <div className="relative flex grow flex-col">
          <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
            {spaceLocationsData.map((location) => (
              <li
                key={location.location_id}
                className={`${location.location_id === selectedLocation ? 'bg-main text-white' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-2.5 shadow`}
              >
                <button
                  type="button"
                  onClick={() => selectLocation(location.location_id)}
                  className="flex h-fit w-full space-x-5 text-left"
                >
                  <div className="flex size-full flex-col">
                    <div className="font-medium">
                      {location.location_name}
                    </div>
                    <div className="text-xs">
                      {location.location}
                    </div>
                  </div>
                </button>
              </li>
            ))}

            <li
              className={`${selectedLocation === null ? 'bg-main text-white' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-2.5 shadow`}
            >
              <button
                type="button"
                onClick={() => selectLocation(null)}
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

        <Button
          text="Ver en Mapa"
          isTypeButton
          onClick={() => setIsMapOpen(true)}
          color="green"
        />
      </div>

      {(isMapOpen) && (
        <div className="absolute left-0 top-0 size-full">
          <MarkersMap
            markers={spaceLocationsData}
            markerColor={spaceData.color}
            markersType="location"
            isScreenSmall
            onMarkerClick={(loc) => selectMarker(loc.location_id)}
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

export default EnterNodeLocation;
