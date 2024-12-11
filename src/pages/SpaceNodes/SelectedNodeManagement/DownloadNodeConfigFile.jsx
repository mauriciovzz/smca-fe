import { React } from 'react';

import { saveAs } from 'file-saver';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

const DownloadNodeConfigFile = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const navigate = useNavigate();

  const { spaceData, selectedNode } = useOutletContext();

  const RequestNodeCodeInfo = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}/config-file`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'arraybuffer',
        },
      );

      const filename = response.headers['content-disposition'].split('filename=')[1].replace(/['"]+/g, '');

      const blob = new Blob([response.data], { type: 'text/x-c' });
      saveAs(blob, filename);
    } catch (error) {
      errorHandler(error);
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
