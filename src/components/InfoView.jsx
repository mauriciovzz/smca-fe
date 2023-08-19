import { useState, useEffect } from "react";
import locationService from "../services/locations";

const InfoView = ({ nodeLocation }) => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    locationService
      .getLocation(nodeLocation)
      .then((requestedLocation) =>
        setLocation(requestedLocation));
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col overflow-hidden">

      {/* title */}
      <div className="bg-white px-4 py-2 font-semibold text-bluey">
        {nodeLocation.node_type}-{nodeLocation.node_id}
      </div>

      {/* body */}
      <div className="px-4 py-2">

        {/* location */}
        <div className="pb-1">
          <div className="text-[16px] font-normal text-white">
            {location.location_name}
          </div>
          {(location.location_address) &&
            <div className="text-[12px] font-normal text-white">
              {location.location_address}
            </div>
          }
        </div>

        {/* coord */}
        <div className="text-[12px] font-normal text-white flex justify-between">
          Coord: {location.lat},{location.long}
        </div>

        {/* date */}
        <div className="text-[12px] font-normal text-white flex justify-between">
          Inicio: {nodeLocation.start_date}, {nodeLocation.start_time}
        </div>
      </div>
    </div>
  );
};

export default InfoView;
