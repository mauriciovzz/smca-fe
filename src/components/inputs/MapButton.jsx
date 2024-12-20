import React from 'react';

import { mapWhiteIcon } from 'src/assets';

const MapButton = ({ onClick }) => (
  <button
    type="button"
    className="flex w-[45px] items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700"
    onClick={() => onClick()}
  >
    <img
      src={mapWhiteIcon}
      alt="arrow"
      className="size-[25px] rotate-180"
    />
  </button>
);

export default MapButton;
