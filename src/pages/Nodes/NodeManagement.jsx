import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import ManagementMenu from './NodeManagementSections/ManagementMenu';
import NodeOverview from './NodeManagementSections/NodeOverview';
import UpdateLocation from './NodeManagementSections/UpdateLocation';
import UpdateState from './NodeManagementSections/UpdateState';
import UpdateType from './NodeManagementSections/UpdateType';
import UpdateVisibility from './NodeManagementSections/UpdateVisibility';

const NodeManagement = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const [nodeComponents, setNodeComponents] = useState([]);

  const getComponents = async () => {
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
    getComponents();
  }, []);

  const renderView = () => {
    switch (view) {
      case 'UpdateState':
        return (
          <UpdateState
            nodeState={selectedNode.state}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateType':
        return (
          <UpdateType
            nodeType={selectedNode.type}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateVisibility':
        return (
          <UpdateVisibility
            nodeVisibility={selectedNode.is_visible}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateLocation':
        return (
          <UpdateLocation
            nodeLocation={selectedNode.location_id}
            changeView={(value) => setView(value)}
          />
        );
      case 'ManagementMenu':
        return (
          <ManagementMenu
            selectedNode={selectedNode}
            nodeComponents={nodeComponents}
            changeView={(value) => setView(value)}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <NodeOverview
                selectedNode={selectedNode}
                nodeComponents={nodeComponents}
                changeView={(value) => setView(value)}
                close={() => changeView()}
              />
            )
            : (
              <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Selecciona una opción para realizar cambios.</span>
              </div>
            )
        );
    }
  };

  return (
    <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden grow bg-background sm:flex">
        <NodeOverview
          selectedNode={selectedNode}
          nodeComponents={nodeComponents}
          changeView={(value) => setView(value)}
          close={() => changeView()}
        />
      </div>

      <div className="flex grow bg-background">
        {renderView()}
      </div>
    </div>
  );
};

export default NodeManagement;
