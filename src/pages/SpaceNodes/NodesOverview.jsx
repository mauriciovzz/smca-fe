import { React, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { addIcon, indoorIcon, outdoorIcon } from 'src/assets';
import { Button } from 'src/components/inputs';
import { MarkersMap } from 'src/components/maps';
import { Divider, Heading, NodeLabel } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';

const NodesOverview = ({ nodesData, spaceData }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();
  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <div className="flex justify-between">
            <Heading text="Nodos" />

            {
              (spaceData.is_admin) && (
                <Link className="self-start" to="agregar">
                  <img
                    src={addIcon}
                    alt="add icon"
                    className="size-[25px] sm:size-[36px]"
                  />
                </Link>
              )
            }
          </div>

          <Divider />

          <div className="relative flex size-full flex-col space-y-5 overflow-hidden">
            <div className="relative flex grow">
              <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                {
                  nodesData
                    .map((node) => (
                      <li
                        key={node.node_id}
                        className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                      >
                        <Link
                          className="flex h-fit w-full space-x-5"
                          to={`${node.node_id}`}
                        >
                          <div className="size-[25px] self-center">
                            <img
                              src={node.is_indoor ? indoorIcon : outdoorIcon}
                              alt={node.is_indoor ? 'indoor node' : 'outdoor icon'}
                              className="size-[25px]"
                            />
                          </div>

                          <div className="flex size-full flex-col">
                            <NodeLabel node={node} />

                            <div className="break-words text-left font-medium">
                              {node.node_name}
                            </div>

                            {
                              (node.location_id) && (
                                <>
                                  <Divider changePadding="p-0.5" />

                                  <div className="text-left text-xs text-gray-500">
                                    <span className="font-medium text-black">
                                      {node.is_location_visible ? 'público' : 'privado'}
                                    </span>
                                    {` | ${node.location_name}`}
                                  </div>
                                </>
                              )
                            }
                          </div>
                        </Link>
                      </li>
                    ))
                }
              </ul>
            </div>

            {
              (isScreenSmall) && (
                <Button
                  text="Buscar Ubicación en el Mapa"
                  isTypeButton
                  onClick={() => setIsMapOpen(true)}
                  color="blue"
                />
              )
            }
          </div>
        </div>
      </div>

      {
        (!isScreenSmall) && (
          <MarkersMap
            markers={nodesData.filter((n) => n.location_id)}
            onMarkerClick={(n) => navigate(`${n.node_id}`)}
            markerPopUp={(n) => (
              <>
                <b>{n.node_name}</b>
                <br />
                {n.location_name}
              </>
            )}
          />
        )
      }

      {
        (isScreenSmall) && (isMapOpen) && (
          <div className="absolute size-full">
            <MarkersMap
              markers={nodesData.filter((n) => n.location_id)}
              isScreenSmall={isScreenSmall}
              onMarkerClick={(n) => navigate(`${n.node_id}`)}
              markerPopUp={(n) => (
                <>
                  <b>{n.node_name}</b>
                  <br />
                  {n.location_name}
                </>
              )}
              closeMarkersMap={() => setIsMapOpen(false)}
            />
          </div>
        )
      }
    </div>
  );
};

export default NodesOverview;
