import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import spacesService from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

const DeleteSpace = () => {
  const { spaceData, updateSelectedSpaceRoot, errorHandler } = useOutletContext();
  const navigate = useNavigate();

  const [spaceName, setSpaceName] = useState('');

  const handleDeleteSpace = async () => {
    if (spaceData.name === spaceName) {
      try {
        const response = await spacesService.remove(spaceData.space_id);

        notificationHelper.success(response);
        navigate('/espacios');
      } catch (error) {
        const goTo = errorHandler(error, updateSelectedSpaceRoot);

        if (goTo)
          navigate(goTo);
      }
    } else {
      notificationHelper.errorMsg('El nombre ingresado no es correcto.');
    }
  };

  return (
    <div className="flex grow flex-col space-y-5 rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Eliminar Espacio"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <div className="space-y-5">
          <p className="text-justify text-gray-500">
            {`Si estás seguro de querer eliminar el espacio "${spaceData.name}", 
            ingrese el nombre del mismo y luego haga clic en el botón "Eliminar Espacio".`}
          </p>

          <p className="text-justify text-gray-500">
            {`Toma en cuenta que se eliminara todos los datos del mismo, 
            incluyendo la informacion de los nodos registrados y las lecturas realizadas por los mismos.`}
          </p>
        </div>
      </div>

      <TextInput
        id="workspaceName"
        type="text"
        labelText="Nombre del Espacio"
        value={spaceName}
        setValue={setSpaceName}
      />

      <Button
        text="Eliminar Espacio"
        isTypeButton
        onClick={() => handleDeleteSpace()}
        color="red"
      />
    </div>
  );
};

export default DeleteSpace;
