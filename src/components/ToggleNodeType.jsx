import { React } from 'react';

import ToggleButton from './ToggleButton';

const ToggleNodeType = ({ selectedType, selectType }) => (
  <ToggleButton
    labelText="Tipo"
    selectedOption={selectedType}
    leftOption={{
      title: 'Indoor',
      text: 'El nodo se encuentra en un espacio interno',
      value: 'Indoor',
      onClick: () => selectType('Indoor'),
      color: 'bg-indoor',
    }}
    rigthOption={{
      title: 'Outdoor',
      text: 'El nodo se encuentra en un espacio externo',
      value: 'Outdoor',
      onClick: () => selectType('Outdoor'),
      color: 'bg-outdoor',
    }}
  />
);

export default ToggleNodeType;
