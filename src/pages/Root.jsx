import { React } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { Navbar } from 'src/components/bars';

const Root = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  return (
    <>
      <div className="relative flex h-screen w-full flex-col justify-between bg-background">
        <Navbar />

        {!isHomeRoute && <Outlet />}
      </div>

      {isHomeRoute && (<Outlet />)}
    </>
  );
};

export default Root;
