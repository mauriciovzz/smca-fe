import React from 'react';

import Label from './Label';

const TextInput = ({
  id, type, labelText, value, setValue, autoComplete, disabled,
}) => (
  <label htmlFor={id} className="flex flex-col">
    <Label text={labelText} />
    <input
      className={`${disabled ? 'bg-gray-100' : 'bg-gray-50'} 
                  w-full rounded-lg border border-gray-300 px-2 py-1.5 focus:border-main focus:ring-main`}
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      autoComplete={disabled ? 'off' : autoComplete}
      disabled={disabled}
      required
    />
  </label>
);

export default TextInput;
