import { React } from 'react';

const NodeInformationWidget = ({ selectedNode }) => (
  <div className="flex h-full w-full flex-col rounded-xl bg-white p-5 shadow">

    {/* title */}
    <div className="flex space-x-1 border-b pb-2 text-black">
      <div className="text-2xl font-medium">
        {`${(selectedNode.node_type === 'OUT') ? 'Outdoor' : 'Indoor'}-${selectedNode.node_id}`}
      </div>
      <div className="self-end pb-1 text-xs font-normal">
        {`[${selectedNode.lat}, ${selectedNode.long}]`}
      </div>
    </div>

    {/* selectedNode */}
    <div className="pt-2 text-black">
      <div className="text-base font-medium">
        {selectedNode.location_name}
      </div>
      <div className="whitespace-normal text-sm font-normal">
        {selectedNode.selectedNode}
      </div>
    </div>

  </div>
);

export default NodeInformationWidget;
