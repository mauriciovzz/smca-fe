import { React, useState, useEffect } from 'react';
import locationService from 'src/services/locations';

const NodeInformationWidget = ({ selectedNode }) => {
  const [load, setLoad] = useState(false);
  const [location, setLocation] = useState({});

  useEffect(() => {
    locationService
      .getOne(selectedNode)
      .then((data) => {
        setLocation(data);
        setLoad(!load);
      });
  }, []);

  return !load ? null : (
    <div className="absolute flex h-full w-full flex-col overflow-hidden rounded-xl bg-white px-4 py-2 shadow">

      {/* title */}
      <div className="flex space-x-1 border-b pb-2 text-black">
        <div className="text-2xl font-medium">
          {`${(selectedNode.node_type === 'OUT') ? 'Outdoor' : 'Indoor'}-${selectedNode.node_id}`}
        </div>
        <div className="self-end pb-1 text-xs font-normal">
          {`[${location.lat}, ${location.long}]`}
        </div>
      </div>

      {/* location */}
      <div className="pt-2 text-black">
        <div className="text-base font-medium">
          {location.location_name}
        </div>
        <div className="whitespace-normal text-sm font-normal">
          {location.address}
        </div>
      </div>

    </div>
  );
};

export default NodeInformationWidget;
