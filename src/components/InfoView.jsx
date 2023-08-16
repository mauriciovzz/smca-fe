import { useState, useEffect } from "react";
import locationService from "../services/locations";

const InfoView = ({ node }) => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    locationService
      .getLocation(node)
      .then((requestedLocation) =>
        setLocation(requestedLocation));
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col overflow-hidden">
      <div className="bg-white px-4 py-2 font-semibold text-bluey">
        {node.type}-{node.id}
      </div>

      <div className="px-4 py-2">
        <div className="text-[16px] font-normal text-white">{location.nom}</div>
        <div className="text-[16px] font-normal text-white">
          Lat: {location.lat}
        </div>
        <div className="text-[16px] font-normal text-white">
          Long: {location.long}
        </div>
      </div>
    </div>
  );
};

export default InfoView;
