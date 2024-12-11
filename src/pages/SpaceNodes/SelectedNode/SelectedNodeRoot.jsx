import { React, useEffect, useState } from 'react';

import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

import SelectedNodeOverview from './SelectedNodeOverview';

const SelectedNodeRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, nodesData } = useOutletContext();

  const { nodeId } = useParams();
  const selectedNode = nodesData
    .find((n) => n.node_id === parseInt(nodeId, 10));

  const [loadingData, setLoadingData] = useState(true);
  const [nodeComponentsData, setNodeComponentsData] = useState([]);

  const getNodeComponentsData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}/components`,
      );

      setNodeComponentsData(response.data);
      setLoadingData(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      if (errorMessage === 'NodeDoesNotExists') {
        notificationHelper.error('El nodo indicado no se encuentra registrado.');
        navigate('..');
      } else {
        errorHandler(error);
      }
    }
  };

  useEffect(() => {
    getNodeComponentsData();
  }, []);

  return loadingData
    ? <LoaderSpinner isSmall />
    : (
      <div className="flex grow flex-col">
        <div className="flex grow bg-background">
          <SelectedNodeOverview
            spaceData={spaceData}
            selectedNode={selectedNode}
            nodeComponentsData={nodeComponentsData}
          />
        </div>
      </div>
    );
};

export default SelectedNodeRoot;
