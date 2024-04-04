import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import ManagementMenu from './NodeManagementSections/ManagementMenu';
import NodeOverview from './NodeManagementSections/NodeOverview';

const NodeManagement = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [nodeComponents, setNodeComponents] = useState([]);

  const getNodeComponents = async () => {
    try {
      const response = await nodesService.getComponents(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
      );
      setNodeComponents(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getNodeComponents();
  }, []);

  const renderView = () => {
    switch (view) {
      case 'ManagementMenu':
        return (
          <ManagementMenu
            selectedNode={selectedNode}
            nodeComponents={nodeComponents}
            getNodeComponents={() => getNodeComponents()}
            changeView={(value) => setView(value)}
            updateNodes={updateNodes}
          />
        );
      default:
        return (
          <NodeOverview
            selectedNode={selectedNode}
            nodeComponents={nodeComponents}
            changeView={(value) => setView(value)}
            updateNodes={updateNodes}
            close={() => changeView()}
          />
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-background">
      {renderView()}
    </div>
  );
};

export default NodeManagement;
