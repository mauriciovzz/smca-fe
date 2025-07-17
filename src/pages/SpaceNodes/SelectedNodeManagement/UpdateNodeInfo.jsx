import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import {
  Button, TextInput, ToggleSwitch, ToggleNodeType,
} from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateName = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, selectedNode, updateNodesData } = useOutletContext();

  const [name, setName] = useState(selectedNode.node_name);
  const [isIndoor, setIsIndoor] = useState(selectedNode.is_indoor);
  const [isActive, setIsActive] = useState(selectedNode.is_active);

  const handleNodeUpdate = async () => {
    try {
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}`,
        {
          name,
          isIndoor,
          readingInterval: 10,
          isActive,
        },
      );

      notificationHelper.success(response.data);
      updateNodesData();
    } catch (error) {
      errorHandler(error);
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
          isDisabled={!selectedNode.location_id}
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
