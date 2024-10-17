import { React } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from 'src/components/Navbar';

const Root = () => (
  <div className="relative flex h-screen w-full flex-col justify-between bg-background">
    <Navbar />
    <Outlet />
  </div>
);

export default Root;
