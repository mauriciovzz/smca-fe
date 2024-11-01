import { React, useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';

import { Map } from 'src/components';
import { NodeReadingsDashboard } from 'src/layout';
import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

const WorkspaceMap = () => {
  const { selectedWorkspace } = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState({});

  const selectNode = (node) => {
    setIsOpen(true);
    setSelectedNode(node);
  };

  const getWorkspaceNodes = async () => {
    try {
      const response = await nodesService.getWorkspaceNodes(selectedWorkspace.workspace_id);
      setNodes(response);
    } catch (err) {
      notificationHelper.error(err);
    }
  };

  useEffect(() => {
    getWorkspaceNodes();
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
        zoomControl={window.innerWidth >= 640}
      />

      {isOpen && <NodeReadingsDashboard selectedNode={selectedNode} setIsOpen={setIsOpen} />}

    </>

  );
};

export default WorkspaceMap;
