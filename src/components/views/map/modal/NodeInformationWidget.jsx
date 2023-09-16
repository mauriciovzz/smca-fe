import { React, useState, useEffect } from 'react';
import locationService from 'src/services/locations';

const NodeInformationWidget = ({ selectedNode }) => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    locationService
      .getOne(selectedNode)
      .then((requestedLocation) => setLocation(requestedLocation));
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow">

      {/* title */}
      <div className="border-b bg-slate-100 p-4 text-lg font-medium text-slate-400">
        {`${(selectedNode.node_type === 'OUTDOOR') ? 'Outdoor' : 'Indoor'}-${selectedNode.node_id}`}
      </div>

      {/* body */}
      <div className="space-y-2 px-4 py-2 text-[12px] font-normal text-slate-500">

        {/* location */}
        <div>
          <div className="text-[16px] font-normal">
            {location.location_name}
          </div>
          <div>
            {location.location_address}
          </div>
        </div>

        {/* coord */}
        <div>
          {`Coord: ${location.lat},${location.long}`}
        </div>

        {/* date */}
        <div>
          {`Inicio:${selectedNode.start_date}, ${selectedNode.start_time}`}
        </div>
      </div>

    </div>
  );
};

export default NodeInformationWidget;
