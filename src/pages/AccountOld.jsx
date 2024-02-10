import { React } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/SideBar';

const Account = () => (
  <div className="flex grow bg-slate-100 ">
    <div className="flex w-full space-x-5 p-5">

      <SideBar />

      <Outlet />

    </div>
  </div>
);

export default Account;
