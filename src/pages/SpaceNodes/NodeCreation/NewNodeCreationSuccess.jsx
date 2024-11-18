import { React } from 'react';

import { successIcon } from 'src/assets';
import { Button } from 'src/components/inputs';

const NodeCreationSuccess = ({ onClose }) => (
  <div className="flex grow flex-col bg-white">
    <div className="flex grow flex-col">
      <div className="flex flex-col items-center justify-center gap-[5px] border-b py-2.5">
        <img
          src={successIcon}
          alt="success icon"
          className="size-[30px]"
        />
        <div className="text-center font-bold">
          Nodo Creado Exitosamente
        </div>
      </div>

      <p className="border-b py-2.5 text-justify text-sm text-gray-500">
        {`
          El nodo se encuentra actualmente en estado 'Inactivo'.
          Cuando el mismo esté funcionando en la ubicación indicada,
          cambia su estado a 'Activo' en la sección 'Modificar'.
        `}
      </p>

      <p className="py-2.5 text-justify text-sm text-gray-500">
        {`
          Para acceder a la información necesaria para la codificacion del nodo,
          dirígete al apartado 'Descargar Configuración', en la sección 'Modificar' .
        `}
      </p>
    </div>

    <Button
      text="Regresar"
      isTypeButton
      onClick={() => onClose()}
      color="blue"
    />
  </div>
);

export default NodeCreationSuccess;
