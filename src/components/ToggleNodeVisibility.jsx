import { React } from 'react';

import ToggleButton from './ToggleButton';

const ToggleNodeVisibility = ({ selectedVisibility, selectVisibility }) => (
  <ToggleButton
    labelText="Visibilidad"
    selectedOption={selectedVisibility}
    leftOption={{
      title: 'Privado',
      text: 'Nodo disponible solo para los miembros de este espacio',
      value: 'Privado',
      onClick: () => selectVisibility('Privado'),
      color: 'bg-private',
    }}
    rigthOption={{
      title: 'Público',
      text: 'Nodo disponible para todos los usuarios de esta aplicación',
      value: 'Público',
      onClick: () => selectVisibility('Público'),
      color: 'bg-public',
    }}
  />
);

export default ToggleNodeVisibility;
