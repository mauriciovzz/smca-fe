import React from 'react';

const Label = ({ text, noBottomMargin }) => (
  <h2 className={`${noBottomMargin ? '' : 'mb-2'} text-sm font-bold leading-none text-black`}>
    {text}
  </h2>
);

export default Label;
