import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon, nodeIcon } from 'src/assets';
import {
  Button, Divider, Heading, Map,
} from 'src/components';

const MarkersMap = ({
  nodes, selectNode, isScreenSM, changeView,
}) => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex h-full w-full overflow-hidden rounded-lg shadow">
      <Map
        markerList={nodes}
        onMarkerClick={selectNode}
        markerPopup={
          (node) => (
            <>
              <b>{node.name}</b>
              <br />
              {node.address}
            </>
          )
        }
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

  const stateBadge = (state) => {
    switch (state) {
      case 'Activo':
        return (
          <div className="w-1/3 rounded-lg bg-green-500 text-sm font-medium text-white ">
            Activo
          </div>
        );
      case 'Inactivo':
        return (
          <div className="w-1/3 rounded-lg bg-yellow-500 text-sm font-medium text-white ">
            Inactivo
          </div>
        );
      case 'Fuera de Servicio':
        return (
          <div className="w-1/3 rounded-lg bg-red-500 text-sm font-medium text-white ">
            FDS
          </div>
        );
      default:
        return (
          <div className="w-1/3" />
        );
    }
  };

  const typeBadge = (type) => {
    switch (type) {
      case 'Indoor':
        return (
          <div className="w-1/3 rounded-lg bg-slate-500 text-sm font-medium text-white ">
            Indoor
          </div>
        );
      case 'Outdoor':
        return (
          <div className="w-1/3 rounded-lg bg-sky-500 text-sm font-medium text-white ">
            Outdoor
          </div>
        );
      default:
        return (
          <div className="w-1/3" />
        );
    }
  };

  const visibilityBadge = (visibility) => {
    if (visibility) {
      return (
        <div className="w-1/3 rounded-lg bg-sky-500 text-sm font-medium text-white ">
          Publico
        </div>
      );
    }
    return (
      <div className="w-1/3 rounded-lg bg-slate-500 text-sm font-medium text-white ">
        Privado
      </div>
    );
  };

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
            <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
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
                              {node.name}
                            </div>
                            <div className="text-left text-xs font-medium text-gray-500">
                              {node.location}
                            </div>
                          </div>
                          <div className="flex space-x-2.5 pt-2.5 text-sm">
                            {stateBadge(node.state)}
                            {typeBadge(node.type)}
                            {visibilityBadge(node.is_visible)}
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
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="flex items-center justify-center space-x-2.5 pt-5"
              >
                <div className="font-medium">
                  Buscar nodo en el mapa
                </div>
                <img
                  src={nodeIcon}
                  alt="node icon"
                  className="h-[34px] w-[34px]"
                />
              </button>
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
