import { React } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';

const Account = ({ setUser }) => (
  <div className="flex grow bg-slate-100 ">
    <div className="flex w-full space-x-5 p-5">

      <SideBar setUser={setUser} />

      <Outlet />
    </div>
  </div>
);

export default Account;
