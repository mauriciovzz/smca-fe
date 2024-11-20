import React from 'react';

import { BlurEffect } from 'src/components/ui';

import MapBase from './MapBase';

const MapBackground = () => (
  <>
    <BlurEffect index="z-10" />
    <MapBase hideZoomControl />
  </>
);

export default MapBackground;
