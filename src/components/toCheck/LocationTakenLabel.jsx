import { React } from 'react';

const LocationBadge = ({ isTaken }) => (
  (isTaken)
    ? (
      <div className="text-left text-xs font-medium text-red-500">
        EN USO
      </div>
    )
    : (
      <div className="text-left text-xs font-medium text-green-500">
        DISPONIBLE
      </div>
    )
);

export default LocationBadge;
