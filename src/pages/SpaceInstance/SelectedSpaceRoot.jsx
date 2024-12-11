import { React, useEffect, useState } from 'react';

import {
  useLocation, Outlet, useNavigate, useParams,
} from 'react-router-dom';

import { SideBar, BottomBar } from 'src/components/bars';
import { LoaderSpinner } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

const SelectedSpaceRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { spaceId } = useParams();

  const [loadingData, setLoadingData] = useState(true);
  const [spaceData, setSpacesData] = useState([]);

  const [updateData, setUpdateData] = useState(0);
  const updateSpaceData = () => setUpdateData(Math.random());

  const getSpaceData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceId}`,
      );

      setSpacesData(response.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate('/');
    } else {
      getSpaceData();
    }
  }, [updateData]);

  const location = useLocation();
  const isHomeRoute = location.pathname === `/espacios/${spaceId}`;

  const isScreenSmall = useScreenWidth();
  const getHeight = () => {
    if (isScreenSmall)
      return isHomeRoute ? 'h-fit' : 'grow';

    return 'grow';
  };

  return loadingData
    ? <LoaderSpinner />
    : (
      <>
        <div className={`${getHeight()} flex flex-col gap-5 px-5 pb-5 sm:flex-row`}>
          <div className={`${isScreenSmall ? 'order-2 h-fit w-full' : 'z-10 order-1 h-full w-fit'}`}>
            {
              !isScreenSmall
                ? (<SideBar spaceId={spaceData.space_id} />)
                : (<BottomBar spaceId={spaceData.space_id} />)
            }
          </div>

          {!isHomeRoute && (
            <div className={`${isScreenSmall ? 'order-1' : 'order-2'} flex grow`}>
              <Outlet context={{ spaceData, updateSpaceData }} />
            </div>
          )}
        </div>

        {isHomeRoute && (<Outlet context={{ spaceData, updateSpaceData }} />)}
      </>
    );
};

export default SelectedSpaceRoot;
