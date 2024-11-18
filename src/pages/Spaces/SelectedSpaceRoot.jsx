import React from 'react';

import {
  useLocation, Outlet, redirect, useLoaderData, useOutletContext, useRevalidator,
} from 'react-router-dom';

import { SideBar, BottomBar } from 'src/components/bars';
import useScreenWidth from 'src/hooks/useScreenWidth';
import spaceServices from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

export const selectedSpaceLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const spaceData = await spaceServices.getOne(params.spaceId);
    return spaceData;
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

const SelectedSpaceRoot = () => {
  const { errorHandler } = useOutletContext();
  const spaceData = useLoaderData();
  const isScreenSmall = useScreenWidth();
  const location = useLocation();
  const revalidator = useRevalidator();

  const isMapRoute = location.pathname === `/espacios/${spaceData.space_id}`;

  const updateSelectedSpaceRoot = () => revalidator.revalidate();

  const getHeight = () => {
    if (isScreenSmall)
      return isMapRoute ? 'h-fit' : 'grow';

    return 'grow';
  };

  return (
    <>
      <div className={`${getHeight()} flex flex-col gap-5 px-5 pb-5 sm:flex-row`}>
        <div className={`${isScreenSmall ? 'order-2 h-fit w-full' : 'z-10 order-1 h-full w-fit'}`}>
          {
            !isScreenSmall
              ? (<SideBar spaceId={spaceData.space_id} />)
              : (<BottomBar spaceId={spaceData.space_id} />)
          }
        </div>

        {
          !isMapRoute && (
            <div className={`${isScreenSmall ? 'order-1' : 'order-2'} flex grow`}>
              <Outlet context={{ spaceData, updateSelectedSpaceRoot, errorHandler }} />
            </div>
          )
        }
      </div>

      {isMapRoute && <Outlet context={{ spaceData, updateSelectedSpaceRoot, errorHandler }} />}
    </>
  );
};

export default SelectedSpaceRoot;
