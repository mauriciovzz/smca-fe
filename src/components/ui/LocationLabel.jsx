import { React } from 'react';

const LocationLabel = ({ location }) => (
  <div className={`${(location.is_taken) ? 'text-red-500' : 'text-green-500'} flex text-left text-xs font-medium`}>
    {(location.is_taken) ? 'EN USO' : 'DISPONIBLE'}
  </div>
);

export default LocationLabel;
