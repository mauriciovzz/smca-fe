import React from 'react';

import { Badge } from 'src/components/ui';

const VariableListItem = ({
  variable, onClick, wasSelected, isEditable,
}) => (
  <li
    className={`${wasSelected
      ? `${isEditable ? 'bg-sky-100' : 'bg-white'}`
      : 'bg-white hover:bg-slate-100'} 
      h-fit w-full border-b px-5 py-2.5 shadow`}
  >
    <button
      type="button"
      onClick={() => onClick()}
      className="flex w-full items-center space-x-2.5"
    >
      <div className="flex w-full flex-col text-left">
        <div className="text-sm font-medium">
          {variable.name}
        </div>
        <div className="text-xs text-gray-500">
          {variable.unit}
        </div>
      </div>
      <div className="w-fit">
        <Badge value={variable.variable_type} height="h-[20px]" />
      </div>
    </button>
  </li>
);

export default VariableListItem;
