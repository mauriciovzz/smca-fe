import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, TextInput,
} from 'src/components';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

const UpdateName = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();

  const [name, setName] = useState(selectedNode.node_name);

  const handleNameUpdate = async () => {
    try {
      const response = await nodesService.updateName(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
        { nodeName: name },
      );

      notifications.success(response);
      updateNodes();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Actualizar Nombre"
        hasButton
        onButtonClick={() => changeView(null)}
      />

      <Divider />

      <div className="flex grow flex-col space-y-5">
        <TextInput
          id="newNodeName"
          type="text"
          labelText="Nombre"
          value={name}
          setValue={setName}
        />
      </div>

      <Button
        text="Guardar Cambios"
        typeIsButton
        onClick={() => handleNameUpdate()}
        color="blue"
        disabled={selectedNode.node_name === name}
      />
    </div>
  );
};

export default UpdateName;
