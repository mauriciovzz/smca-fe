import { React } from 'react';

import { Link, useRouteError } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError();
  console.log('err', error);

  return (
    <div className="relative flex h-screen w-full flex-col justify-between bg-background">
      <div className="z-20 flex grow space-y-5 px-5 pb-5 sm:items-center sm:justify-center">
        <Link to="/">Not found</Link>
      </div>
    </div>
  );
};

export default NotFound;
