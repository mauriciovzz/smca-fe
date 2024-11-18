import { React, useEffect } from 'react';

import {
  Outlet, useOutlet, useOutletContext,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';

import SpaceSettingsOverview from './SpaceSettingsOverview';

const NoOptionSelected = () => (
  <div className="flex size-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona una opción para realizar cambios.</span>
  </div>
);

const SpaceSettingsRoot = () => {
  const { spaceData, updateSelectedSpaceRoot, errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();

  useEffect(() => {
    updateSelectedSpaceRoot();
  }, []);

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet) {
        return <Outlet context={{ spaceData, updateSelectedSpaceRoot, errorHandler }} />;
      }
      return <SpaceSettingsOverview spaceData={spaceData} />;
    }

    if (outlet) {
      return <Outlet context={{ spaceData, updateSelectedSpaceRoot, errorHandler }} />;
    }

    return <NoOptionSelected />;
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
        <div className="hidden grow bg-background sm:flex">
          <SpaceSettingsOverview spaceData={spaceData} />
        </div>

        <div className="flex grow bg-background">
          {renderOutlet()}
        </div>
      </div>
    </div>
  );
};

export default SpaceSettingsRoot;
