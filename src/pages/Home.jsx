import {
  React, useState, useEffect, useContext,
} from 'react';

import { Map } from 'src/components';
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
          <>
            <b>
              {node.node_name}
            </b>
            <br />
            {node.location_name}
          </>
        )}
        markersQuantity="many"
        zoomControl
      />

      {isOpen && <NodeReadingsDashboard selectedNode={selectedNode} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Home;
