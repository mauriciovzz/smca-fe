import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import spacesService from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateSpaceName = () => {
  const { spaceData, updateSpaceInstanceRoot, errorHandler } = useOutletContext();
  const [newName, setNewName] = useState(spaceData.name);
  const navigate = useNavigate();

  const handleUpdateSpaceNameSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await spacesService.updateName(
        spaceData.space_id,
        { newName },
      );

      notificationHelper.success(response);
      updateSpaceInstanceRoot();
    } catch (error) {
      const goTo = errorHandler(error, updateSpaceInstanceRoot);

      if (goTo)
        navigate(goTo);
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
