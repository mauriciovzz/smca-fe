import {
  React, useState, useRef,
} from 'react';

import {
  control, locationIcon, memory, nodeIcon,
} from 'src/assets';
import { Badge } from 'src/components';

const NodeInformationWidget = ({ selectedNode, nodeComponents, setIsOpen }) => {
  const [infoView, setInfoView] = useState(null);

  // Component scroll
  const centerRef = useRef(null);
  let repeater;
  const scroll = (o) => { centerRef.current.scrollLeft += o; };
  const updateRepeater = (o) => { repeater = setInterval(scroll, 100, o); };

  const renderInfoView = () => {
    switch (infoView) {
      case 'componentsInfo':
        return (
          <div className="relative flex h-full w-full">
            <div className="absolute flex h-full w-full">
              <div
                className="mr-2 hidden w-[31px] justify-center rounded-lg hover:bg-graydetails sm:flex"
                onMouseEnter={() => updateRepeater(-20)}
                onMouseLeave={() => clearInterval(repeater)}
              >
                <img
                  src={control}
                  alt="left var list scroll"
                  className=" h-[20px] w-[20px] self-center"
                />
              </div>

              <div ref={centerRef} className="flex h-full w-full space-x-2 overflow-auto scroll-smooth whitespace-nowrap pb-2 sm:hide-scrollbar sm:pb-0">
                {
                  nodeComponents.map(
                    (c) => (
                      <a
                        key={c.component_id}
                        href={c.datasheet_link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="h-full w-fit flex-col rounded-lg border p-2.5 hover:bg-slate-100"
                      >
                        <div className="flex h-2/3 flex-col justify-center">
                          <div className="w-full text-left text-xs font-semibold uppercase">
                            {c.type}
                          </div>

                          <div className="w-full text-left ">
                            {c.name}
                          </div>
                        </div>

                        <div className="flex h-1/3 justify-center">
                          <div className="flex h-fit w-full space-x-2">
                            {
                              (c.variables.lengt !== 0) && (
                                c.variables.map((vari) => (
                                  <div
                                    key={vari.component_id}
                                    className="rounded-lg px-1.5 text-sm"
                                    style={{ backgroundColor: vari.color }}
                                  >
                                    {vari.name}
                                  </div>
                                ))
                              )
                            }
                          </div>
                        </div>
                      </a>
                    ),
                  )
                }
              </div>

              <div
                className="ml-2 hidden w-[31px] justify-center rounded-lg hover:bg-graydetails sm:flex"
                onMouseEnter={() => updateRepeater(20)}
                onMouseLeave={() => clearInterval(repeater)}
              >
                <img
                  src={control}
                  alt="right var list scroll"
                  className="hidden h-[20px] w-[20px] rotate-180 self-center sm:flex"
                />
              </div>
            </div>
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

                <div className="text-sm leading-none">
                  {selectedNode.location}
                </div>
              </div>
            </div>

            <div className="grid h-fit w-full grid-cols-2 gap-2 border-t pt-2 sm:flex sm:grid-cols-none">
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
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-5 shadow sm:flex-row">
      <div className="flex justify-evenly border-b pb-2 sm:flex-col sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5">
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

      <div className="flex h-full w-full flex-col pt-2 sm:pl-5 sm:pt-0">
        <div className="w-full border-b pb-2 text-center text-3xl sm:text-left">
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
