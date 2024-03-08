import React from 'react';

import Label from './Label';

const TextAreaInput = ({
  id, labelText, value, setValue, disabled,
}) => (
  <label htmlFor={id} className="block">
    <Label text={labelText} />
    <textarea
      className={`${disabled ? 'bg-disabled' : 'bg-enabled'} 
                    block w-full resize-none rounded-lg border border-gray-300 p-2.5 text-sm focus:border-sky-600`}
      id={id}
      name={id}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      rows="3"
      autoComplete="address"
      disabled={disabled}
      required
    />
  </label>
);

export default TextAreaInput;
