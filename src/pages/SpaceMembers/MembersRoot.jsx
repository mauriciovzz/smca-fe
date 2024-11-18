import { React, useEffect } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useOutletContext,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';
import membersService from 'src/services/members';
import notificationHelper from 'src/utils/notificationHelper';

import MembersOverview from './MembersOverview';

export const membersLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const membersData = await membersService.getMembers(params.spaceId);

    return membersData;
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

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Gestiona a los miembros de este espacio o agrega nuevos integrantes.</span>
  </div>
);

const MembersRoot = () => {
  const { spaceData, updateSelectedSpaceRoot, errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();
  const membersData = useLoaderData();

  useEffect(() => {
    updateSelectedSpaceRoot();
  }, []);

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet) {
        return (
          <Outlet context={{
            spaceData, membersData, updateSelectedSpaceRoot, errorHandler,
          }}
          />
        );
      }
      return <MembersOverview membersData={membersData} spaceData={spaceData} />;
    }

    if (outlet) {
      return (
        <Outlet context={{
          spaceData, membersData, updateSelectedSpaceRoot, errorHandler,
        }}
        />
      );
    }

    return <NoOptionSelected />;
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
        <div className="hidden grow bg-background sm:flex">
          <MembersOverview membersData={membersData} spaceData={spaceData} />
        </div>

        <div className="flex grow bg-background">
          {renderOutlet()}
        </div>
      </div>
    </div>
  );
};

export default MembersRoot;
