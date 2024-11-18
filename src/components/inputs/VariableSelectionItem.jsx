import React from 'react';

import { Divider } from 'src/components/ui';

const ComponentListItem = ({
  component, selectedComponents, onClick, color,
}) => {
  const renderVariableButtonLook = (v) => {
    const isSelected = selectedComponents.find(
      (c) => c.component_id === component.component_id && c.variable_id === v.variable_id,
    );

    if (isSelected)
      return `${color} text-white hover:cursor-pointer`;

    if (onClick)
      return 'bg-white hover:bg-gray-100 hover:cursor-pointer';

    return 'bg-white';
  };

  return (
    <li className="flex h-fit w-full flex-col border-b bg-white p-2.5 shadow">
      <div className="break-words text-left font-medium">
        {component.name}
      </div>

      <Divider changePadding="p-1" />

      <ul className="grid grid-cols-2 gap-1.5 text-xs sm:grid-cols-4 sm:text-sm">
        {component.variables.map((variable) => (
          <li
            key={`${component.component_id}${variable.variable_id}`}
            className={`${renderVariableButtonLook(variable)} flex h-7 items-center justify-center rounded border font-medium text-black sm:h-8`}
          >
            <button
              type="button"
              onClick={() => onClick({ type: 'variable', component_id: component.component_id, variable_id: variable.variable_id })}
              className="size-full"
            >
              {variable.name}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ComponentListItem;
