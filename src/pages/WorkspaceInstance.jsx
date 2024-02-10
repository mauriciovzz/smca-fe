import React from 'react';

import { useParams, Outlet, useLocation } from 'react-router-dom';

import { SideBar, BottomBar } from 'src/layout';

const WorkspaceInstance = () => {
  const { workspaceId } = useParams();
  const location = useLocation();
  const isMapRoute = location.pathname === `/espacios-de-trabajo/${workspaceId}`;

  return (
    <>
      <div className={`${isMapRoute ? 'h-fit sm:w-fit ' : 'h-full'} flex w-full flex-col gap-5 px-5 pb-5 sm:h-full sm:flex-row`}>
        <SideBar workspaceId={workspaceId} />
        {!isMapRoute && <Outlet />}
        <BottomBar workspaceId={workspaceId} />
      </div>
      {isMapRoute && <Outlet />}
    </>
  );
};

export default WorkspaceInstance;
