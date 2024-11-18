import { React, useEffect } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useOutletContext,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';
import variablesService from 'src/services/variables';
import notificationHelper from 'src/utils/notificationHelper';

import VariablesOverview from './VariablesOverview';

export const variablesLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const variablesData = await variablesService.getAll(params.spaceId);

    return variablesData;
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
    <span>Selecciona una variable de la lista para gestionarla</span>
    <span>o el botón ⊕ para crear una nueva.</span>
  </div>
);

const VariablesRoot = () => {
  const { spaceData, updateSelectedSpaceRoot, errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();
  const variablesData = useLoaderData();

  useEffect(() => {
    updateSelectedSpaceRoot();
  }, []);

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet) {
        return (
          <Outlet context={{
            spaceData, variablesData, updateSelectedSpaceRoot, errorHandler,
          }}
          />
        );
      }
      return <VariablesOverview variablesData={variablesData} spaceData={spaceData} />;
    }

    if (outlet) {
      return (
        <Outlet context={{
          spaceData, variablesData, updateSelectedSpaceRoot, errorHandler,
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
          <VariablesOverview variablesData={variablesData} spaceData={spaceData} />
        </div>

        <div className="flex grow bg-background">
          {renderOutlet()}
        </div>
      </div>
    </div>
  );
};

export default VariablesRoot;
