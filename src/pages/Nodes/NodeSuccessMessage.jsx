import { React } from 'react';

import { successIcon } from 'src/assets';
import { Button, Divider } from 'src/components';

const NodeSuccessMessage = ({ title, includeCodeMessage, close }) => (
  <div className="flex grow flex-col space-y-5 rounded-lg border bg-white p-5">
    <div className="flex grow flex-col">
      <div className="flex items-center justify-center space-x-2">
        <img
          src={successIcon}
          alt="success icon"
          className="h-[24px] w-[24px]"
        />
        <div className="text-center font-bold">
          {title}
        </div>
      </div>
      <Divider changePadding="p-[5px]" />
      <p className="text-justify text-sm text-gray-500">
        {`
          El nodo se encuentra actualmente en estado 'Inactivo'.
          Cuando el mismo esté funcionando en la ubicación indicada,
          cambia su estado a 'Activo' en la sección 'Modificar'.
        `}
      </p>
      {
        (includeCodeMessage) && (
          <>
            <Divider changePadding="p-[5px]" />
            <p className="text-justify text-sm text-gray-500">
              {`
                Para acceder a la información necesaria para la codificacion del nodo,
                dirígete a la sección 'Código'.
              `}
            </p>
          </>
        )
      }
    </div>

    <Button
      text="Regresar"
      typeIsButton
      onClick={() => close()}
      color="blue"
    />
  </div>
);

export default NodeSuccessMessage;
