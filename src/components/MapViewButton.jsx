import { React } from 'react';

import { nodeIcon } from 'src/assets';

const MapViewButton = ({ text, onClick, padding }) => (
  <button
    type="button"
    onClick={() => onClick()}
    className={`
      ${!padding ? 'pt-2.5' : padding}
      flex items-center justify-center space-x-2 pt-2.5
    `}
  >
    <div className="text-sm font-medium">
      {text}
    </div>
    <img
      src={nodeIcon}
      alt="node icon"
      className="h-[24px] w-[24px]"
    />
  </button>
);

export default MapViewButton;
