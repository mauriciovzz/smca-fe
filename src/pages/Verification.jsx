import { React } from 'react';

import { Outlet } from 'react-router-dom';

import { MapBackground } from 'src/components/maps';
import accountsService from 'src/services/accounts';

export const accountVerificationLoader = async ({ params }) => {
  const response = await accountsService.verify(params.accountId, params.verificationToken);
  return response;
};

export const newEmailVerificationLoader = async ({ params }) => {
  const response = await accountsService.verifyNewEmail(params.accountId, params.verificationToken);
  return response;
};

const Verification = () => (
  <>
    <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
      <Outlet />
    </div>

    <MapBackground />
  </>
);

export default Verification;
