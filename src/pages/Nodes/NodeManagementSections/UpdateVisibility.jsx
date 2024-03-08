import { React, useState } from 'react';

// import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, OptionButton,
} from 'src/components';

const UpdateVisibility = ({ nodeVisibility, changeView }) => {
  // const { selectedWorkspace } = useOutletContext();

  const [selectedVisibility, setSelectedVisibility] = useState(nodeVisibility);

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Actualizar Visibilidad"
        hasButton
        onButtonClick={() => changeView('ManagementMenu')}
      />

      <Divider />

      <div className="flex grow flex-col space-y-5">
        <OptionButton
          type="Privado"
          description="Nodo disponible solo para los miembros de este espacio"
          color="stone"
          onClick={() => setSelectedVisibility(false)}
          selected={selectedVisibility === false}
        />
        <OptionButton
          type="Publico"
          description="Nodo disponible para todos los usuarios de esta aplicación"
          color="sky"
          onClick={() => setSelectedVisibility(true)}
          selected={selectedVisibility === true}
        />

      </div>

      <Button
        text="Guardar Cambios"
        typeIsButton
        onClick={undefined}
        color="blue"
      />
    </div>
  );
};

export default UpdateVisibility;
