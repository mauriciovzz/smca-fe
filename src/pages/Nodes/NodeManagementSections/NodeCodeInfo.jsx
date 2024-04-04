import { React } from 'react';

import { saveAs } from 'file-saver';
import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading,
} from 'src/components';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

const NodeCodeInfo = ({ selectedNode, changeView }) => {
  const { selectedWorkspace } = useOutletContext();

  const RequestNodeCodeInfo = async () => {
    try {
      const response = await nodesService.getConfigFile(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
      );

      const blob = new Blob([response], { type: 'text/x-c' });
      saveAs(blob, `node_${selectedNode.node_code}_config.h`);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col space-y-5 rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Codigo"
          hasButton
          onButtonClick={() => changeView(null)}
        />

        <Divider />

        <div className="space-y-5">
          <p className="text-justify text-gray-500">
            {`Oprime el botón "Descargar" para obtener un archivo .h 
            con información necesaria para la codificación de este nodo.`}
          </p>
        </div>
      </div>

      <Button
        text="Descargar"
        typeIsButton
        onClick={() => RequestNodeCodeInfo()}
        color="blue"
      />
    </div>
  );
};

export default NodeCodeInfo;
