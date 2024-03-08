import {
  React, useState, useEffect,
} from 'react';

import { useOutletContext } from 'react-router-dom';

import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import NodeCreation from './NodeCreation';
import NodeList from './NodeList';
import NodeManagement from './NodeManagement';

const Nodes = () => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const getNodes = async () => {
    try {
      const response = await nodesService.getAll(selectedWorkspace.workspace_id);
      setNodes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getNodes();
  }, []);

  const selectNode = (node) => {
    setSelectedNode(node);
    setView('NodeManagement');
  };

  const renderView = () => {
    switch (view) {
      case 'NodeCreation':
        return (
          <NodeCreation
            updateNodes={() => getNodes()}
            changeView={() => setView(null)}
          />
        );
      case 'NodeManagement':
        return (
          <NodeManagement
            selectedNode={selectedNode}
            updateNodes={() => getNodes()}
            changeView={() => setView(null)}
          />
        );
      default:
        return (
          <NodeList
            nodes={nodes}
            selectNode={(node) => selectNode(node)}
            changeView={() => setView('NodeCreation')}
          />
        );
    }
  };

  return (
    <div className="flex grow bg-background">
      {renderView()}
    </div>
  );
};

export default Nodes;
