import { React } from 'react';

const CheckBoxInput = ({ labelText, value, setValue }) => (
  <label htmlFor="checkBoxInput" className="flex">
    <div className="flex items-center">
      <input
        id="checkBoxInput"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 bg-gray-50 text-main focus:ring-main-alt"
        checked={value}
        onChange={() => setValue(!value)}
      />
    </div>
    <span className="ml-1.5 text-sm text-gray-500 ">
      {labelText}
    </span>
  </label>
);

export default CheckBoxInput;
