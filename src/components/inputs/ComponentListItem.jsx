import React from 'react';

import { ComponentLabel, Divider } from 'src/components/ui';

const ComponentListItem = ({ component }) => (
  <li className="flex h-fit w-full flex-col border-b bg-white p-2.5 shadow">
    <ComponentLabel component={component} />

    <div className="break-words text-left font-medium">
      {component.name}
    </div>

    {(component.type === 'sensor') && (
      <>
        <Divider changePadding="p-1" />

        <ul className="grid grid-cols-2 gap-1.5 text-xs sm:grid-cols-4 sm:text-sm">
          {component.variables.map((variable) => (
            <li
              key={`${component.component_id}${variable.variable_id}`}
              className="flex h-7 items-center justify-center rounded border bg-white font-medium text-black sm:h-8"
            >
              {variable.name}
            </li>
          ))}
        </ul>
      </>
    )}
  </li>
);

export default ComponentListItem;
