import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, ToggleNodeVisibility,
} from 'src/components';
import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateVisibility = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();

  const [selectedVisibility, setSelectedVisibility] = useState(selectedNode.is_visible ? 'Público' : 'Privado');

  const handleVisibilityUpdate = async () => {
    try {
      const response = await nodesService.updateVisibility(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
        { newVisibility: !(selectedVisibility === 'Privado') },
      );

      notificationHelper.success(response);
      updateNodes();
    } catch (err) {
      notificationHelper.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Actualizar Visibilidad"
        hasButton
        onButtonClick={() => changeView(null)}
      />

      <Divider />

      <div className="flex grow">
        <ToggleNodeVisibility
          selectedVisibility={selectedVisibility}
          selectVisibility={setSelectedVisibility}
        />
      </div>

      <Button
        text="Guardar Cambios"
        isTypeButton
        onClick={() => handleVisibilityUpdate()}
        color="blue"
        disabled={selectedNode.is_visible === !(selectedVisibility === 'Privado')}
      />
    </div>
  );
};

export default UpdateVisibility;
