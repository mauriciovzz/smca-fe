import { React } from 'react';

import { Button } from 'src/components/inputs';
import MapBase from 'src/components/maps/MapBase';
import { Divider, Heading } from 'src/components/ui';

const MarkersMap = ({
  markers, isScreenSmall, onMarkerClick, markerPopUp, closeMarkersMap,
}) => (
  <div className="flex size-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow">
    {
        (isScreenSmall) && (
          <>
            <Heading text="Ubicaciones" />
            <Divider />
          </>

        )
      }

    <div className="relative flex size-full flex-col space-y-5 overflow-hidden">
      <div className="relative flex size-full overflow-hidden rounded-lg shadow">
        <MapBase
          markerList={markers}
          onMarkerClick={(marker) => onMarkerClick(marker)}
          markerPopup={(marker) => markerPopUp(marker)}
          markersQuantity="many"
          zoomControl
          isNotFullScreen
        />
      </div>

      {
          (isScreenSmall) && (
            <div className="h-fit w-full">
              <Button
                text="Regresar"
                isTypeButton
                onClick={() => closeMarkersMap()}
                color="blue"
              />
            </div>
          )
        }
    </div>

  </div>
);

export default MarkersMap;
