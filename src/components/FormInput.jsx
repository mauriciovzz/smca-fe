import React from 'react';

const FormInput = ({
  id, type, labelName, value, setValue,
}) => (
  <label htmlFor={id} className="block flex-1">
    <div className="mb-2 text-sm font-medium text-gray-900">
      {labelName}
    </div>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      required
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 sm:text-sm"
    />
  </label>
);

export default FormInput;
