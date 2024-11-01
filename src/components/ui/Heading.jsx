import React from 'react';

import { closeIcon, arrowIcon } from 'src/assets';

import useScreenWidth from '../../hooks/useScreenWidth';

const Title = ({ text }) => (
  <h1 className="h-[25px] text-2xl font-bold leading-none tracking-tight sm:h-[36px] sm:text-3xl">
    {text}
  </h1>
);

const Heading = ({ text, hasButton, onButtonClick }) => {
  const isScreenSmall = useScreenWidth();

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
              src={isScreenSmall ? arrowIcon : closeIcon}
              alt={isScreenSmall ? 'arrow' : 'close'}
              className="size-[25px] sm:size-[30px]"
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
