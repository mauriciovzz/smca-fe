import { React } from 'react';

import ToggleSwitch from './ToggleSwitch';

const ToggleNodeType = ({ selectedType, selectType }) => (
  <ToggleSwitch
    labelText="Tipo"
    selectedOption={selectedType}
    leftOption={{
      title: 'Indoor',
      text: 'En espacios internos',
      value: true,
      color: 'bg-main',
      onClick: () => selectType(true),
    }}
    rigthOption={{
      title: 'Outdoor',
      text: 'En espacios externos',
      value: false,
      color: 'bg-main',
      onClick: () => selectType(false),
    }}
  />
);

export default ToggleNodeType;
