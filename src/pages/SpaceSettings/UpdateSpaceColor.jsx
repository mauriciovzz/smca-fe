import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, ColorInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateSpaceColor = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, updateSpaceData } = useOutletContext();

  const [newColor, setNewColor] = useState(spaceData.color);

  const handleUpdateSpaceColorSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/update-color`,
        { newColor },
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
