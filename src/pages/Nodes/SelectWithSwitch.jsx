import { React, useState } from 'react';
import Switch from 'react-switch';
import Select, { components } from 'react-select';

const Menu = (props) => {
  const { children, selectProps } = props;

  return (
    <components.Menu {...props}>
      <div>
        <div>{children}</div>

        <button
          type="button"
          className="flex h-[10px] w-full items-center justify-center border bg-white p-4 text-sm font-medium text-sky-600"
          onClick={selectProps.onButtonClick}
          onTouchStart={selectProps.onButtonClick}
        >
          {selectProps.buttonText}
        </button>
      </div>
    </components.Menu>
  );
};

const SelectWithSwitch = ({
  title, hasSwitch, componentList, componentType, handleSelection, closeSwitch, onButtonClick,
}) => {
  const [checked, setChecked] = useState(false);

  const handleSwitch = (nextChecked) => {
    if (!nextChecked) closeSwitch();
    setChecked(nextChecked);
  };

  const getButtonText = () => {
    switch (componentType) {
      case 'BOARD':
        return 'placa';
      case 'SENSOR':
        return 'sensor';
      case 'CAMERA':
        return 'camara';
      case 'SCREEN':
        return 'pantalla';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-fit flex-col py-2">

      <div className="flex items-center justify-between pb-1">
        <h2 className="text-lg leading-tight tracking-tight text-gray-900 sm:text-xl">
          {title}
        </h2>

        {
          hasSwitch && (
            <Switch
              checked={checked}
              onChange={(nextChecked) => handleSwitch(nextChecked)}
              onColor="#0284c7"
              handleDiameter={16}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
            />
          )
        }
      </div>

      {
        ((hasSwitch ? checked : true) && (
        <Select
          options={
            componentList && componentList
              .filter((e) => e.component_type === componentType)
              .map((e) => ({ value: e, label: e.component_name }))
          }
          components={{ Menu }}
          maxMenuHeight={100}
          onChange={(selectedVal) => handleSelection(selectedVal.value.component_id)}
          buttonText={`Agregar ${getButtonText()}`}
          onButtonClick={onButtonClick}
        />
        ))
      }
    </div>
  );
};

export default SelectWithSwitch;
