import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, ToggleNodeType,
} from 'src/components';
import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateType = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [types, setTypes] = useState([]);

  const [selectedType, setSelectedType] = useState(selectedNode.type);

  const getTypes = async () => {
    const response = await nodesService.getTypes();
    setTypes(response);
  };

  useEffect(() => {
    getTypes();
  }, []);

  const handleTypeUpdate = async () => {
    try {
      const response = await nodesService.updateType(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
        { nodeType: types.find((t) => t.type === selectedType).node_type_id },
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
        text="Actualizar Tipo"
        hasButton
        onButtonClick={() => changeView(null)}
      />

      <Divider />

      <div className="grow">
        <ToggleNodeType
          selectedType={selectedType}
          selectType={setSelectedType}
        />
      </div>

      <Button
        text="Guardar Cambios"
        isTypeButton
        onClick={() => handleTypeUpdate()}
        color="blue"
        disabled={selectedNode.type === selectedType}
      />
    </div>
  );
};

export default UpdateType;
