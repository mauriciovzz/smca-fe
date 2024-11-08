import { React, useEffect } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useOutletContext,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';
import componentsService from 'src/services/components';
import notificationHelper from 'src/utils/notificationHelper';

import ComponentsOverview from './ComponentsOverview';

export const componentsLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const componentsData = await componentsService.getAll(params.spaceId);

    return componentsData;
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
  <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona un componente de la lista para gestionarlo</span>
    <span>o el botón ⊕ para crear uno nuevo.</span>
  </div>
);

const ComponentsRoot = () => {
  const { spaceData, updateSpaceInstanceRoot, errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();
  const componentsData = useLoaderData();

  useEffect(() => {
    updateSpaceInstanceRoot();
  }, []);

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet) {
        return (
          <Outlet context={{
            spaceData, componentsData, updateSpaceInstanceRoot, errorHandler,
          }}
          />
        );
      }
      return <ComponentsOverview componentsData={componentsData} spaceData={spaceData} />;
    }

    if (outlet) {
      return (
        <Outlet context={{
          spaceData, componentsData, updateSpaceInstanceRoot, errorHandler,
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
          <ComponentsOverview componentsData={componentsData} spaceData={spaceData} />
        </div>

        <div className="flex grow bg-background">
          {renderOutlet()}
        </div>
      </div>
    </div>
  );
};

export default ComponentsRoot;
