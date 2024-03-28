import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import {
  Badge, Button, Divider, Heading, Map, MapViewButton,
} from 'src/components';

const MarkersMap = ({
  nodes, selectNode, isScreenSM, changeView,
}) => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex h-full w-full overflow-hidden rounded-lg shadow">
      <Map
        markerList={nodes}
        onMarkerClick={selectNode}
        markerPopup={(node) => (
          <>
            <b>
              {node.node_name}
            </b>
            <br />
            {node.location_name}
          </>
        )}
        markersQuantity="many"
        zoomControl
        isNotFullScreen
      />
    </div>
    {
      (isScreenSM) && (
        <div className="h-fit w-full">
          <Button
            text="Regresar"
            typeIsButton
            onClick={() => changeView()}
            color="blue"
          />
        </div>

      )
    }
  </div>
);

const NodeList = ({ nodes, selectNode, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  return (
    <div className="relative grid h-full w-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <div className="flex justify-between">
            <Heading text="Nodos" />

            {
              (selectedWorkspace.is_admin) && (
                <button
                  type="button"
                  onClick={() => changeView()}
                  className="self-start"
                >
                  <img
                    src={addIcon}
                    alt="add user"
                    className="h-[25px] w-[25px] sm:h-[36px] sm:w-[36px]"
                  />
                </button>
              )
            }
          </div>

          <Divider />

          <div className="relative h-full w-full">
            <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
              {
                nodes
                  .map((node) => (
                    <li
                      key={node.node_id}
                      className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                    >
                      <button
                        type="button"
                        onClick={() => selectNode(node)}
                        className="flex h-fit w-full space-x-5"
                      >
                        <div className="flex w-full flex-col">
                          <div className="flex h-full w-full flex-col">
                            <div className="text-left font-medium">
                              {node.node_name}
                            </div>
                            <div className="text-left text-xs font-medium text-gray-500">
                              {node.location_name}
                            </div>
                          </div>
                          <div className="flex space-x-2.5 pt-2.5 text-sm">
                            <Badge value={node.state} width="w-1/3" rounded="rounded-lg" />
                            <Badge value={node.type} width="w-1/3" rounded="rounded-lg" />
                            <Badge value={node.is_visible ? 'Público' : 'Privado'} width="w-1/3" rounded="rounded-lg" />
                          </div>
                        </div>
                      </button>
                    </li>
                  ))
              }
            </ul>
          </div>
          {
            (isScreenSM) && (
              <MapViewButton text="Buscar nodo en el mapa" onClick={() => setIsMapOpen(true)} />
            )
          }
        </div>
      </div>

      {
        (!isScreenSM) && (
          <MarkersMap
            nodes={nodes}
            selectNode={selectNode}
          />
        )
      }

      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute h-full w-full">
            <MarkersMap
              nodes={nodes}
              selectNode={selectNode}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>

        )
      }
    </div>
  );
};

export default NodeList;
