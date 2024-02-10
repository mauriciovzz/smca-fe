import React from 'react';

import { close, control } from 'src/assets';

const Title = ({ text }) => (
  <h1 className="pb-5 text-2xl font-bold leading-none tracking-tight sm:text-3xl">
    {text}
  </h1>
);

const Heading = ({
  text, hasButton, isCloseButton, onButtonClick,
}) => (
  hasButton
    ? (
      <div className="flex justify-between">
        <Title text={text} />

        <button
          type="button"
          onClick={() => onButtonClick()}
          className="pb-5"
        >
          <img
            src={isCloseButton ? close : control}
            alt={isCloseButton ? 'close button' : 'control arrow'}
            className="h-[28px] w-[28px]"
          />
        </button>
      </div>
    )
    : (
      <Title text={text} />
    )
);

export default Heading;
