import React from 'react';

import { close, control } from 'src/assets';

const Title = ({ text }) => (
  <h1 className="h-[25px] text-2xl font-bold leading-none tracking-tight sm:h-[36px] sm:text-3xl">
    {text}
  </h1>
);

const Heading = ({ text, hasButton, onButtonClick }) => {
  const isScreenSM = window.innerWidth <= 640;

  return (
    hasButton
      ? (
        <div className="flex justify-between">
          <Title text={text} />

          <button
            type="button"
            onClick={() => onButtonClick()}
            className="self-center"
          >
            <img
              src={isScreenSM ? control : close}
              alt={isScreenSM ? 'control' : 'close'}
              className="h-[25px] w-[25px] sm:h-[30px] sm:w-[30px]"
            />
          </button>
        </div>
      )
      : (
        <Title text={text} />
      )
  );
};

export default Heading;
