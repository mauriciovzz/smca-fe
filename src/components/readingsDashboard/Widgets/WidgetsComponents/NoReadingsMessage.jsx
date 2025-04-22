import React from 'react';

const NoReadingsMessage = () => (
  <div className="flex size-full flex-col">
    <div className="border-t px-2 py-1 text-xs sm:px-7 sm:text-sm" />

    <div className="flex size-full items-center justify-center">
      <b className="w-2/3 text-center sm:w-full">
        No existen lecturas realizadas en esta fecha
      </b>
    </div>
  </div>
);

export default NoReadingsMessage;
