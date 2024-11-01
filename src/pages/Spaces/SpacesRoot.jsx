import { React } from 'react';

import {
  Outlet, useOutletContext, redirect, useLoaderData, useOutlet, useRevalidator,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';
import spacesService from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

import SpacesOverview from './SpacesOverview';

export const spacesLoader = async (auth, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const spacesData = await spacesService.getAll();
    const invitationsData = await spacesService.getInvitations(auth.accountId);

    return { spacesData, invitationsData };
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

const SpacesRoot = () => {
  const { errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();
  const revalidator = useRevalidator();
  const { spacesData, invitationsData } = useLoaderData();

  const updateSpaceRoot = () => revalidator.revalidate();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return (
          <Outlet context={{
            spacesData, invitationsData, updateSpaceRoot, errorHandler,
          }}
          />
        );
    } else {
      if (outlet)
        return (
          <Outlet context={{
            spacesData, invitationsData, updateSpaceRoot, errorHandler,
          }}
          />
        );

      return <SpacesOverview spacesData={spacesData} invitationsCount={invitationsData.length} />;
    }
    return null;
  };

  return (
    <div className="flex grow bg-background px-5 pb-5 sm:grid sm:grid-cols-4 sm:grid-rows-1 sm:gap-5">
      <div className={`${outlet ? 'col-span-3' : 'col-span-4'} hidden grow bg-background sm:flex`}>
        <SpacesOverview spacesData={spacesData} invitationsCount={invitationsData.length} />
      </div>

      <div className={`${outlet ? 'col-span-1 flex grow bg-background' : 'hidden'}`}>
        {renderOutlet()}
      </div>
    </div>
  );
};

export default SpacesRoot;
