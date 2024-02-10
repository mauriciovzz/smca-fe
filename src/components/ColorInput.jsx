import React from 'react';

import Label from './Label';

const ColorInput = ({
  id, labelText, value, setValue, disabled,
}) => (
  <label htmlFor={id} className="flex flex-col">
    <Label text={labelText} />
    <input
      className={`${disabled ? 'bg-gray-100' : 'bg-gray-50'} 
                  h-[38px]  w-full rounded-lg border border-gray-300 px-1 py-0.5 focus:border-main focus:ring-1 focus:ring-main`}
      id={id}
      name={id}
      type="color"
      value={value}
      onChange={({ target }) => setValue(target.value)}
      required
      disabled={disabled}
    />
  </label>
);

export default ColorInput;
