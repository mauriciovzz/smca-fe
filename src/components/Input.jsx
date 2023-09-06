import React from 'react';

const Input = ({
  id, name, type, labelName, value, setValue, placeHolder,
}) =>
  (
    <label htmlFor={name} className="block">
      <div className="mb-2 text-sm font-medium text-gray-900">
        {labelName}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={({ target }) =>
          setValue(target.value)}
        placeholder={placeHolder}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
    </label>
  );

export default Input;
