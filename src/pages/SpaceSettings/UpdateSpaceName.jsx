import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateSpaceName = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, updateSpaceData } = useOutletContext();

  const [newName, setNewName] = useState(spaceData.name);

  const handleUpdateSpaceNameSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/update-name`,
        { newName },
      );

      notificationHelper.success(response.data);
      updateSpaceData();
    } catch (error) {
      errorHandler(error, updateSpaceData);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Nombre"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <form onSubmit={handleUpdateSpaceNameSubmit} id="updateSpaceNameForm" className="space-y-5">
          <TextInput
            id="newName"
            type="text"
            labelText="Nombre"
            value={newName}
            setValue={setNewName}
          />
        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="updateSpaceNameForm"
        color="blue"
      />
    </div>
  );
};

export default UpdateSpaceName;
