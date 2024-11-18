import { React, useEffect } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useOutletContext,
} from 'react-router-dom';

import locationsService from 'src/services/locations';
import notificationHelper from 'src/utils/notificationHelper';

import LocationsOverview from './LocationsOverview';

export const locationsLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const locationsData = await locationsService.getAll(params.spaceId);

    return locationsData;
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
  const locationsData = useLoaderData();

  useEffect(() => {
    updateSelectedSpaceRoot();
  }, []);

  const renderOutlet = () => {
    if (outlet) {
      return (
        <Outlet context={{
          spaceData, locationsData, updateSelectedSpaceRoot, errorHandler,
        }}
        />
      );
    }

    return <LocationsOverview locationsData={locationsData} spaceData={spaceData} />;
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
