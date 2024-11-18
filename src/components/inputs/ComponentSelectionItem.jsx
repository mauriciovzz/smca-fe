import React from 'react';

const ComponentSelectionItem = ({
  component, selectedComponents, onClick, color,
}) => {
  const renderComponentItemLook = () => {
    const isSelected = selectedComponents.find((c) => c.component_id === component.component_id);

    if (isSelected)
      return `${color} text-white hover:cursor-pointer`;

    return 'bg-white hover:bg-gray-100 hover:cursor-pointer';
  };

  return (
    <li className={`${renderComponentItemLook()} flex h-fit w-full flex-col border-b shadow`}>
      <button
        type="button"
        onClick={() => onClick({ type: 'component', component_id: component.component_id })}
        className="size-full p-2.5"
      >
        <div className="break-words text-left font-medium">
          {component.name}
        </div>
      </button>
    </li>
  );
};

export default ComponentSelectionItem;
