import React from 'react';

import { closeIcon } from 'src/assets';

const FullScreenPhoto = ({ currentPhoto, setOpenCurrentPhoto }) => (
  <div className="absolute left-0 top-0 z-[100] flex size-full items-center justify-center bg-black/90 backdrop-blur">
    <img
      className="size-full h-auto w-max border border-white"
      src={currentPhoto}
      alt="selected hour pic"
    />
    <div className="absolute right-5 top-5 flex size-[35px] items-center justify-center rounded-lg border bg-white">
      <button
        type="button"
        className="flex size-[25px] items-center justify-center rounded-lg hover:bg-graydetails"
        onClick={() => setOpenCurrentPhoto(false)}
      >
        <img
          alt="expand pic button"
          src={closeIcon}
          className="size-[20px]"
        />
      </button>
    </div>
  </div>
);

export default FullScreenPhoto;
