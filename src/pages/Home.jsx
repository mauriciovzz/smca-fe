import {
  React, useState, useEffect, useContext,
} from 'react';

import { Badge, Map } from 'src/components';
import { AuthContext } from 'src/context/authProvider';
import { NodeReadingsDashboard } from 'src/layout';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

const Home = () => {
  const { checkLocalStorage } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState({});

  const selectNode = (node) => {
    setIsOpen(true);
    setSelectedNode(node);
  };

  const getPublicNodes = async () => {
    try {
      const response = await nodesService.getPublicNodes();
      setNodes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getAccountNodes = async () => {
    try {
      const response = await nodesService.getAccountNodes();
      setNodes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    const user = checkLocalStorage();
    (user) ? getAccountNodes() : getPublicNodes();
  }, []);

  return (
    <>
      <Map
        markerList={nodes}
        onMarkerClick={selectNode}
        markerPopup={(node) => (
          <div className="flex w-full flex-col">
            <div className="flex h-full w-full flex-col">
              <div className="text-left font-semibold">
                {node.node_name}
              </div>
              <div className="text-left text-xs font-medium text-gray-500">
                {node.location_name}
              </div>
            </div>
            <div className="flex space-x-1 pt-2.5 text-xs">
              <Badge value={node.type} width="w-1/3" rounded="rounded-lg" />
              <Badge value={node.is_visible ? 'Público' : 'Privado'} width="w-1/3" rounded="rounded-lg" />
              <Badge value={node.state} width="w-1/3" rounded="rounded-lg" />
            </div>
          </div>
        )}
        markersQuantity="many"
        zoomControl
      />

      {isOpen && <NodeReadingsDashboard selectedNode={selectedNode} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Home;
