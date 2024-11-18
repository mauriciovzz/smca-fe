import { React } from 'react';

import { saveAs } from 'file-saver';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import nodesService from 'src/services/nodes';

const DownloadNodeConfigFile = () => {
  const { spaceData, selectedNode, errorHandler } = useOutletContext();
  const navigate = useNavigate();

  const RequestNodeCodeInfo = async () => {
    try {
      const response = await nodesService.getConfigFile(
        spaceData.space_id,
        selectedNode.node_id,
      );
      const filename = response.headers['content-disposition'].split('filename=')[1].replace(/['"]+/g, '');

      const blob = new Blob([response.data], { type: 'text/x-c' });
      saveAs(blob, filename);
    } catch (error) {
      const goTo = errorHandler(error);

      if (goTo)
        navigate(goTo);
    }
  };

  return (
    <div className="flex grow flex-col space-y-5 rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Archivo del Nodo"
          hasButton
          onButtonClick={() => navigate('..')}
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
        isTypeButton
        onClick={() => RequestNodeCodeInfo()}
        color="blue"
      />
    </div>
  );
};

export default DownloadNodeConfigFile;
