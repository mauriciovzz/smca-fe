import React from 'react';

import MapBase from './MapBase';

const MarkerLocationMap = ({ coordinates, markerColor }) => (
  <div className="relative flex grow overflow-hidden rounded-lg shadow">
    <MapBase
      markersQuantity="oneToShow"
      coordinates={{ lat: coordinates.lat, long: coordinates.long }}
      markerColor={markerColor}
      isNotFullScreen
    />
  </div>
);

export default MarkerLocationMap;
