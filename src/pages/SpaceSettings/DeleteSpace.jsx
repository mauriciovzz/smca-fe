import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const DeleteSpace = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, getSpaceData } = useOutletContext();

  const [spaceName, setSpaceName] = useState('');

  const handleDeleteSpace = async () => {
    if (spaceData.name === spaceName) {
      try {
        const response = await axiosPrivate.delete(
          `/api/spaces/${spaceData.space_id}`,
        );

        notificationHelper.success(response.data);
        navigate('/espacios');
      } catch (error) {
        errorHandler(error, getSpaceData);
      }
    } else {
      notificationHelper.error('El nombre ingresado no es correcto.');
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
