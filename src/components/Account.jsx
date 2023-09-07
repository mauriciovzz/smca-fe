import React from 'react';
import AccountBar from './AccountBar';

const Account = ({ user, setUser }) => {

  return (
    <div className="relative flex flex-grow bg-primary-600 ">
      <div className="z-0 flex flex-grow ">

        <div className="flex flex-col w-full px-11 py-5 space-y-5">
          <AccountBar user={user} setUser={setUser} />

          <div className="flex w-full flex-grow items-center justify-between py-5 px-5  w-full bg-white rounded-lg shadow">
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;
