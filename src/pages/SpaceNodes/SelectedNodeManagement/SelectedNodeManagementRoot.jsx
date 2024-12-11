import { React } from 'react';

import {
  Outlet, useOutletContext, useOutlet, useParams,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';

import SelectedNodeManagementOverview from './SelectedNodeManagementOverview';

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona una opción para realizar cambios.</span>
  </div>
);

// does going back reloads nodes and evrything else in case error? MOPE

const NodeManagementRoot = () => {
  const {
    spaceData,
    locationsData,
    updateLocationsData,
    componentsData,
    updateComponentsData,
    variablesData,
    updateVariablesData,
    nodesData,
    updateNodesData,
  } = useOutletContext();

  const { nodeId } = useParams();
  const selectedNode = nodesData
    .find((n) => n.node_id === parseInt(nodeId, 10));

  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return (
          <Outlet context={{
            spaceData,
            selectedNode,
            locationsData,
            updateLocationsData,
            componentsData,
            updateComponentsData,
            variablesData,
            updateVariablesData,
            nodesData,
            updateNodesData,
          }}
          />
        );

      return <SelectedNodeManagementOverview />;
    }

    if (outlet)
      return (
        <Outlet context={{
          spaceData,
          selectedNode,
          locationsData,
          updateLocationsData,
          componentsData,
          updateComponentsData,
          variablesData,
          updateVariablesData,
          nodesData,
          updateNodesData,
        }}
        />
      );

    return <NoOptionSelected />;
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
        <div className="hidden grow bg-background sm:flex">
          <SelectedNodeManagementOverview />
        </div>

        <div className="flex grow bg-background">
          {renderOutlet()}
        </div>
      </div>
    </div>
  );
};

export default NodeManagementRoot;
