import { React, useEffect } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useOutletContext,
} from 'react-router-dom';

import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

import NodesOverview from './NodesOverview';

export const nodesLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const nodesData = await nodesService.getSpaceNodes(params.spaceId);

    return nodesData;
  } catch (error) {
    const errorMessage = error.response.data.message;

    const errorData = loaderErrors.find((err) => err.errorMessage === errorMessage);

    if (errorData) {
      if (errorData.showMessage)
        notificationHelper.errorMsg(errorData.errorMessage);

      return redirect(errorData.redirectTo);
    }

    return null;
  }
};

const LocationsRoot = () => {
  const { spaceData, updateSelectedSpaceRoot, errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const nodesData = useLoaderData();

  useEffect(() => {
    updateSelectedSpaceRoot();
  }, []);

  const renderOutlet = () => {
    if (outlet) {
      return (
        <Outlet context={{
          spaceData, nodesData, updateSelectedSpaceRoot, errorHandler,
        }}
        />
      );
    }

    return <NodesOverview nodesData={nodesData} spaceData={spaceData} />;
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background">
        {renderOutlet()}
      </div>
    </div>
  );
};

export default LocationsRoot;
