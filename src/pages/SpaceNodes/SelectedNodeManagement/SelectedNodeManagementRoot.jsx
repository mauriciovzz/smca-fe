import { React } from 'react';

import {
  Outlet, useOutletContext, useOutlet,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';

import SelectedNodeManagementOverview from './SelectedNodeManagementOverview';

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona una opción para realizar cambios.</span>
  </div>
);

const NodeManagementRoot = () => {
  const {
    spaceData, selectedNode, componentsData, updateSelectedSpaceRoot, errorHandler,
  } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return (
          <Outlet
            context={{
              spaceData, selectedNode, componentsData, updateSelectedSpaceRoot, errorHandler,
            }}
          />
        );

      return <SelectedNodeManagementOverview />;
    }

    if (outlet)
      return (
        <Outlet
          context={{
            spaceData, selectedNode, componentsData, updateSelectedSpaceRoot, errorHandler,
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
