import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import {
  Button, TextInput, ToggleSwitch, ToggleNodeType,
  ToggleReadingInterval,
} from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateName = () => {
  const {
    spaceData, selectedNode, updateSelectedSpaceRoot, errorHandler,
  } = useOutletContext();
  const navigate = useNavigate();

  const [name, setName] = useState(selectedNode.node_name);
  const [isIndoor, setIsIndoor] = useState(selectedNode.is_indoor);
  const [readingInterval, setReadingInterval] = useState(selectedNode.reading_interval);
  const [isActive, setIsActive] = useState(selectedNode.is_active);

  const handleNodeUpdate = async () => {
    try {
      const response = await nodesService.updateInfo(
        spaceData.space_id,
        selectedNode.node_id,
        {
          name,
          isIndoor,
          readingInterval,
          isActive,
        },
      );

      notificationHelper.success(response);
      updateSelectedSpaceRoot();
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Actualizar Nodo"
        hasButton
        onButtonClick={() => navigate('..')}
      />

      <Divider />

      <div className="flex grow flex-col space-y-5">
        <TextInput
          id="name"
          type="text"
          labelText="Nombre"
          value={name}
          setValue={setName}
        />

        <ToggleNodeType
          selectedType={isIndoor}
          selectType={setIsIndoor}
        />

        <ToggleReadingInterval
          selectedOption={readingInterval}
          setSelectedOption={setReadingInterval}
        />

        <ToggleSwitch
          labelText="Estado"
          selectedOption={isActive}
          leftOption={{
            title: 'Activo',
            value: true,
            color: 'bg-main',
            onClick: () => setIsActive(true),
          }}
          rigthOption={{
            title: 'Inactivo',
            value: false,
            color: 'bg-main',
            onClick: () => setIsActive(false),
          }}
        />
      </div>

      <Button
        text="Guardar Cambios"
        isTypeButton
        onClick={() => handleNodeUpdate()}
        color="blue"
      />
    </div>
  );
};

export default UpdateName;
