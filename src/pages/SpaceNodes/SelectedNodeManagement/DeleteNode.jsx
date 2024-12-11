import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, ConfirmationDialog, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const DeleteNode = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, selectedNode, updateNodesData } = useOutletContext();

  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const [nodeName, setNodeName] = useState('');

  const handleNodeDeletion = async () => {
    if (selectedNode.node_name === nodeName) {
      try {
        const response = await axiosPrivate.delete(
          `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}`,
          spaceData.space_id,
          selectedNode.node_id,
        );

        notificationHelper.success(response.data);
        updateNodesData();
        navigate('../..');
      } catch (error) {
        errorHandler(error);
      }
    } else {
      notificationHelper.error('El nombre ingresado no es correcto.');
    }
  };
  return (
    <div className="relative flex grow flex-col space-y-5 rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Eliminar Nodo"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <div className="space-y-5">
          <p className="text-justify text-gray-500">
            {`Si estás seguro de querer eliminar el nodo "${selectedNode.node_name}", 
            ingrese el nombre del mismo y luego haga clic en el botón "Eliminar Nodo".`}
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
        isTypeButton
        onClick={() => setIsConDiaOpen(true)}
        color="red"
      />

      {(isConDiaOpen) && (
        <ConfirmationDialog
          title="Eliminar Ubicación del Espacio"
          description={`Estas seguro de querer eliminar el nodo "${selectedNode.node_name}"?`}
          onDecline={{ text: 'Cancelar', action: () => setIsConDiaOpen(false) }}
          onConfirm={{ text: 'Eliminar', action: () => handleNodeDeletion() }}
        />
      )}
    </div>
  );
};

export default DeleteNode;
