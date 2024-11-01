import { React, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button, ColorInput, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import spacesService from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

const SpacesCreation = () => {
  const { updateSpaceRoot, errorHandler } = useOutletContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [color, setColor] = useState('#0284C7');

  const handleCreateSpaceSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await spacesService.create(
        { name, color },
      );

      notificationHelper.success(response);
      updateSpaceRoot();
    } catch (error) {
      errorHandler(error, updateSpaceRoot);
    }
  };

  return (
    <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Espacio"
          hasButton
          onButtonClick={() => navigate('/espacios')}
        />

        <Divider />

        <form onSubmit={handleCreateSpaceSubmit} id="spaceCreationForm" className="space-y-5">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre del Espacio"
            value={name}
            setValue={setName}
          />
          <ColorInput
            id="color"
            labelText="Color del Espacio"
            value={color}
            setValue={setColor}
          />
        </form>
      </div>

      <Button
        text="Agregar Espacio"
        form="spaceCreationForm"
        color="blue"
      />
    </div>
  );
};

export default SpacesCreation;
