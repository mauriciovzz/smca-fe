import { React } from 'react';

import { Badge } from 'src/components';

const NodeInformationWidget = ({ selectedNode }) => (
  <div className="flex h-full w-full flex-col rounded-xl bg-white p-5 shadow">
    <div className="flex border-b pb-2 text-2xl font-medium text-black">
      {selectedNode.node_name}
    </div>

    <div className="flex grow pt-2">
      <div className="flex h-full w-min flex-col justify-between border-r pr-2">
        <Badge value={selectedNode.type} width="w-[60px]" rounded="rounded-lg" />
        <Badge value={selectedNode.is_visible ? 'Público' : 'Privado'} width="w-[60px]" rounded="rounded-lg" />
        <Badge value={selectedNode.state} width="w-[60px]" rounded="rounded-lg" />
      </div>

      <div className="pl-2 text-sm">
        <div className="flex">
          <div className="font-semibold">
            {selectedNode.location_name}
            &nbsp;
          </div>
        </div>

        <div>
          {selectedNode.location}
        </div>

        <div className="flex">
          <div className="font-semibold">
            Inicio de operación:&nbsp;
          </div>
          {selectedNode.start_date.split('T')[0]}
        </div>
      </div>
    </div>
  </div>
);

export default NodeInformationWidget;
