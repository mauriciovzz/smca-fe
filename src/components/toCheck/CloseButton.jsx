import React from 'react';

import { close } from 'src/assets';

const CloseButton = ({ onClick }) => (
  <div className="flex h-fit items-center justify-center">
    <button
      type="button"
      onClick={() => onClick()}
    >
      <img
        src={close}
        alt="close button"
        className="h-[28px] w-[28px]"
      />
    </button>
  </div>
);

export default CloseButton;
