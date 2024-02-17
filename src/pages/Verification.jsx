import { React } from 'react';

import { Outlet } from 'react-router-dom';

import { BackdropFilter, Map } from 'src/components';

const Verification = () => (
  <>
    <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
      <Outlet />
    </div>

    <BackdropFilter index="z-10" />
    <Map />
  </>
);

export default Verification;
