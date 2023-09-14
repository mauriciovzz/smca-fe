import React from 'react';

const LocationManagement = ({ location }) => (
  <div>
    {location.lat}
    {location.long}
  </div>
);

export default LocationManagement;
