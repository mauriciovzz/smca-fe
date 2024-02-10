import { React, useState } from 'react';

import { Outlet } from 'react-router-dom';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <Outlet context={{ selectedLocation, setSelectedLocation }} />
  );
};

export default Locations;
