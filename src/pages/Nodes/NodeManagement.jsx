import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import DeleteNode from './NodeManagementSections/DeleteNode';
import ManagementMenu from './NodeManagementSections/ManagementMenu';
import NodeOverview from './NodeManagementSections/NodeOverview';
import UpdateComponents from './NodeManagementSections/UpdateComponents';
import UpdateLocation from './NodeManagementSections/UpdateLocation';
import UpdateName from './NodeManagementSections/UpdateName';
import UpdateState from './NodeManagementSections/UpdateState';
import UpdateType from './NodeManagementSections/UpdateType';
import UpdateVisibility from './NodeManagementSections/UpdateVisibility';

const NodeManagement = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

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

  const getCurrentVariables = () => {
    const sensors = nodeComponents.filter((nc) => nc.type === 'Sensor');
    const nodeVariables = [];

    sensors.forEach((s) => s.variables.forEach((v) => nodeVariables.push(v)));
    return nodeVariables;
  };

  const renderView = () => {
    switch (view) {
      case 'UpdateName':
        return (
          <UpdateName
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateState':
        return (
          <UpdateState
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateType':
        return (
          <UpdateType
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateVisibility':
        return (
          <UpdateVisibility
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateLocation':
        return (
          <UpdateLocation
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateComponents':
        return (
          <UpdateComponents
            selectedNode={selectedNode}
            currentComponents={nodeComponents.filter((nc) => nc.type !== 'Sensor de Lluvia')}
            currentRainSensor={nodeComponents.filter((nc) => nc.type === 'Sensor de Lluvia')}
            currentVariables={getCurrentVariables()}
            updateCurrentComponents={() => getNodeComponents()}
            changeView={(value) => setView(value)}
          />
        );
      case 'DeleteNode':
        return (
          <DeleteNode
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
            resetView={() => changeView()}
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
