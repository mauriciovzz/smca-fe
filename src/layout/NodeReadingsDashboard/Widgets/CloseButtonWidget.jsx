import React from 'react';

import { close } from 'src/assets';

const CloseButtonWidget = ({ setIsOpen }) => (
  <button
    type="button"
    onClick={() => setIsOpen(false)}
    className="flex h-full w-full items-center justify-center rounded-xl bg-white shadow hover:bg-graydetails"
  >
    <img
      src={close}
      alt="close button"
      className="h-[28px] w-[28px]"
    />
  </button>
);

export default CloseButtonWidget;
