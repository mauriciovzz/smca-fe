import { React } from 'react';

import { useMap } from 'react-leaflet';

import { plusIcon, lessIcon } from 'src/assets';

const ZoomControl = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.setZoom(map.getZoom() + 1);
  };

  const handleZoomOut = () => {
    map.setZoom(map.getZoom() - 1);
  };

  return (
    <div className="absolute bottom-0 left-0 z-[1000] m-5 h-[50px] w-[25px] rounded-lg bg-white shadow">
      <button
        type="button"
        className="flex size-[25px] cursor-pointer items-center justify-center rounded-t-lg border-b hover:bg-graydetails"
        onClick={() => handleZoomIn()}
      >
        <img
          src={plusIcon}
          alt="layers menu button"
          className="size-[15px]"
        />
      </button>
      <button
        type="button"
        className="flex size-[25px] cursor-pointer items-center justify-center rounded-b-lg hover:bg-graydetails"
        onClick={() => handleZoomOut()}
      >
        <img
          src={lessIcon}
          alt="layers menu button"
          className="size-[15px]"
        />
      </button>
    </div>
  );
};

export default ZoomControl;
