import { React, useState } from 'react';

import {
  control, locationIcon, memory, nodeIcon,
} from 'src/assets';
import { Badge } from 'src/components';

const NodeInformationWidget = ({ selectedNode, setIsOpen }) => {
  const [infoView, setInfoView] = useState(null);

  const renderInfoView = () => {
    switch (infoView) {
      case 'componentsInfo':
        return (
          <div className="flex h-full w-full flex-col">
            idk yet...
          </div>
        );
      default:
        return (
          <div className="flex h-full w-full flex-col">
            <div className="flex h-full w-full items-center gap-5 pb-2">
              <img
                src={locationIcon}
                alt="location info button"
                className="h-[28px] w-[28px]"
              />
              <div>
                <div className="font-semibold leading-none">
                  {selectedNode.location_name}
                </div>

                <div className=" text-sm leading-none">
                  {selectedNode.location}
                </div>
              </div>
            </div>

            <div className="flex h-fit w-full gap-2 border-t pt-2">
              <Badge value={selectedNode.type} width="w-full" rounded="rounded-lg" />
              <Badge value={selectedNode.is_visible ? 'Público' : 'Privado'} width="w-full" rounded="rounded-lg" />
              <Badge value={selectedNode.state} width="w-full" rounded="rounded-lg" />
              <div className="flex h-[24px] w-full items-center justify-center rounded-lg bg-slate-500">
                <div className="text-xs font-semibold text-white">{selectedNode.start_date.split('T')[0]}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full rounded-xl bg-white p-5 shadow">
      <div className="flex flex-col justify-evenly border-r pr-5">
        <button
          type="button"
          className="flex h-[35px] w-[35px] items-center justify-center rounded-lg hover:bg-graydetails"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={control}
            alt="go back button"
            className="h-[28px] w-[28px]"
          />
        </button>

        <button
          type="button"
          className={`${(infoView === null) && 'bg-graydetails'} flex h-[35px] w-[35px] items-center justify-center rounded-lg hover:bg-graydetails`}
          onClick={() => setInfoView(null)}
        >
          <img
            src={nodeIcon}
            alt="node info button"
            className="h-[28px] w-[28px]"
          />
        </button>

        <button
          type="button"
          className={`${(infoView === 'componentsInfo') && 'bg-graydetails'} flex h-[35px] w-[35px] items-center justify-center rounded-lg hover:bg-graydetails`}
          onClick={() => setInfoView('componentsInfo')}
        >
          <img
            src={memory}
            alt="components info button"
            className="h-[28px] w-[28px]"
          />
        </button>
      </div>

      <div className="flex h-full w-full flex-col pl-5">
        <div className="w-full border-b pb-2 text-3xl">
          {selectedNode.node_name}
        </div>

        <div className="flex h-full w-full items-center justify-center pt-2">
          {renderInfoView()}
        </div>
      </div>
    </div>
  );
};

export default NodeInformationWidget;
