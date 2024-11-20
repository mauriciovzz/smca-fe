import React from 'react';

import { Button } from 'src/components/inputs';

import MapBase from './MapBase';

const CoordinatesSelectionMap = ({
  coordinates, setCoordenates, recenter,
  markerColor,
  isScreenSmall, closeSelectionMap,
}) => (
  <div className="flex size-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex size-full overflow-hidden rounded-lg shadow">
      <MapBase
        markersQuantity="one"
        coordinates={coordinates}
        setCoordenates={setCoordenates}
        recenter={recenter}
        markerColor={markerColor}
        isNotFullScreen
      />
    </div>

    {
      (isScreenSmall) && (
        <div className="h-fit w-full">
          <Button
            text="Regresar"
            isTypeButton
            onClick={() => closeSelectionMap()}
            color="blue"
          />
        </div>
      )
    }
  </div>
);

export default CoordinatesSelectionMap;
