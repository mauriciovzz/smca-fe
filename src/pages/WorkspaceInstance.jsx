import React from 'react';

import {
  useParams, useLocation, Outlet, useOutletContext,
} from 'react-router-dom';

import { SideBar, BottomBar } from 'src/layout';

const WorkspaceInstance = () => {
  const { workspaceId } = useParams();
  const { selectedWorkspace, getWorkspaces, setView } = useOutletContext();

  const location = useLocation();
  const isMapRoute = location.pathname === `/espacios-de-trabajo/${workspaceId}`;

  const isScreenSM = (window.innerWidth <= 640);

  const getHeight = () => {
    if (isScreenSM) {
      return isMapRoute ? 'h-fit' : 'h-full';
    }
    return 'h-full';
  };

  return (
    <>
      <div className={`${getHeight()} flex flex-col gap-5 px-5 pb-5 sm:flex-row`}>
        <div className={`${isScreenSM ? 'order-2 h-fit w-full' : 'z-10 order-1 h-full w-fit'}`}>
          {
            !isScreenSM
              ? (<SideBar workspaceId={workspaceId} />)
              : (<BottomBar workspaceId={workspaceId} />)
          }
        </div>

        {
          !isMapRoute && (
            <div className={`${isScreenSM ? 'order-1' : 'order-2'} flex grow`}>
              <Outlet context={{ selectedWorkspace, getWorkspaces, setView }} />
            </div>
          )
        }
      </div>

      {isMapRoute && <Outlet context={{ selectedWorkspace, getWorkspaces, setView }} />}
    </>
  );
};

export default WorkspaceInstance;
