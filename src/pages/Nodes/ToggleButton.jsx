import React from 'react';

const ToggleButton = ({
  title, selected, setSelected, options,
}) => (
  <>
    <h2 className="mb-2 text-sm font-medium text-gray-900">
      {title}
    </h2>
    <div className="flex justify-between">
      <button
        type="button"
        className={`${selected === options[0].value ? 'bg-blue-100' : 'bg-white'} w-1/2 rounded-l-lg border p-2`}
        onClick={() => setSelected(options[0].value)}
      >
        {options[0].label}
      </button>
      <button
        type="button"
        className={`${selected === options[1].value ? 'bg-blue-100' : 'bg-white'} w-1/2 rounded-r-lg border p-2`}
        onClick={() => setSelected(options[1].value)}
      >
        {options[1].label}
      </button>
    </div>
  </>
);

export default ToggleButton;
