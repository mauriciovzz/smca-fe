import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, ColorInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import spacesService from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateSpaceColor = () => {
  const { spaceData, updateSpaceInstanceRoot, errorHandler } = useOutletContext();
  const [newColor, setNewColor] = useState(spaceData.color);
  const navigate = useNavigate();

  const handleUpdateSpaceColorSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await spacesService.updateColor(
        spaceData.space_id,
        { newColor },
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
          text="Actualizar Color"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <form onSubmit={handleUpdateSpaceColorSubmit} id="updateSpaceColorForm" className="space-y-5">
          <ColorInput
            id="newColor"
            labelText="Color"
            value={newColor}
            setValue={setNewColor}
          />
        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="updateSpaceColorForm"
        color="blue"
      />
    </div>
  );
};

export default UpdateSpaceColor;
