import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, TextInput,
} from 'src/components';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

const DeleteNode = ({
  selectedNode, updateNodes, changeView, resetView,
}) => {
  const { selectedWorkspace } = useOutletContext();
  const [nodeName, setNodeName] = useState('');

  const handleNodeDeletion = async () => {
    if (selectedNode.node_name === nodeName) {
      try {
        const response = await nodesService.remove(
          selectedWorkspace.workspace_id,
          selectedNode.node_id,
        );
        notifications.success(response);
        updateNodes();
        resetView();
      } catch (err) {
        notifications.error(err);
      }
    } else {
      notifications.errorMsg('El nombre ingresado no es correcto.');
    }
  };
  return (
    <div className="flex grow flex-col space-y-5 rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Eliminar Nodo"
          hasButton
          onButtonClick={() => changeView(null)}
        />

        <Divider />

        <div className="space-y-5">
          <p className="text-justify text-gray-500">
            {`Si estás seguro de querer eliminar el nodo "${selectedNode.node_name}", 
            ingrese el nombre del mismo y luego haga clic en el botón "Eliminar Nodo".`}
          </p>

          <p className="text-justify text-gray-500">
            Toma en cuenta que se eliminaran todas las lecturas realizadas por el mismo.
          </p>
        </div>
      </div>

      <TextInput
        id="nodeNameToDelete"
        type="text"
        labelText="Nombre del nodo"
        value={nodeName}
        setValue={setNodeName}
      />

      <Button
        text="Eliminar Nodo"
        typeIsButton
        onClick={() => handleNodeDeletion()}
        color="red"
      />
    </div>
  );
};

export default DeleteNode;
