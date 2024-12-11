import { React } from 'react';

import { Oval } from 'react-loader-spinner';

const LoaderSpinner = ({ isSmall }) => (
  <div className={`${isSmall ? 'rounded-lg bg-white shadow' : 'fixed top-0 z-0'} flex size-full items-center justify-center bg-background`}>
    <Oval
      visible
      height="80"
      width="80"
      color="#0369a1"
      secondaryColor="#0284c7"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default LoaderSpinner;
