import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { nodeIcon } from 'src/assets';
import {
  Badge, Button, Divider, Heading, Map,
} from 'src/components';

import DeleteNode from './DeleteNode';
import NodeCodeInfo from './NodeCodeInfo';

const LocationInMap = ({ coordinates, isScreenSM, changeView }) => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">
    <div className="relative flex h-full w-full overflow-hidden rounded-lg shadow">
      <Map
        markersQuantity="oneToShow"
        coordinates={coordinates}
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

const Overview = ({
  selectedWorkspace, selectedNode, nodeComponents, isScreenSM,
  changeView, changeManagementView, close, setIsMapOpen,
}) => (
  <div className="relative flex grow flex-col rounded-lg bg-white p-5 shadow">
    <div className="flex grow flex-col">
      <Heading
        text="Nodo"
        hasButton
        onButtonClick={() => close()}
      />

      <Divider />

      <div className="flex h-full w-full flex-col space-y-5">
        <div className="flex h-fit w-full flex-col items-center justify-center text-center">
          <div className="flex h-fit w-full items-center justify-center text-center font-semibold">
            {selectedNode.node_name}
          </div>

          {
            (isScreenSM)
              ? (
                <div className="flex h-fit w-full justify-between space-x-5 pt-2.5">
                  <div className="flex flex-col text-left font-medium">
                    <div className="text-sm">
                      {selectedNode.location_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedNode.location}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                  >
                    <img
                      src={nodeIcon}
                      alt="node icon"
                      className="h-[25px] w-[25px] self-center"
                    />
                  </button>
                </div>
              )
              : (
                <div className="flex h-fit w-full items-center justify-center text-center font-semibold">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">
                      {selectedNode.location_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedNode.location}
                    </div>
                  </div>
                </div>
              )
          }
        </div>

        <div className="flex h-fit w-full space-x-2.5">
          <Badge value={selectedNode.state} width="w-1/3" rounded="rounded-lg" />
          <Badge value={selectedNode.type} width="w-1/3" rounded="rounded-lg" />
          <Badge value={selectedNode.is_visible ? 'Público' : 'Privado'} width="w-1/3" rounded="rounded-lg" />
        </div>

        <div className="flex grow flex-col">
          <div className="relative flex grow overflow-hidden rounded-lg border">
            <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-scroll bg-background">
              {
                nodeComponents
                  .map((component) => (
                    <li
                      key={component.component_id}
                      className="h-fit w-full border-b bg-white p-2.5 shadow"
                    >
                      <div className="flex h-full w-full flex-col">
                        <div className="flex w-full items-center justify-between">
                          <div className="h-fit w-3/4 break-words font-medium">
                            {component.name}
                          </div>
                          <div className="flex w-1/4 justify-end">
                            <Badge value={component.type} />
                          </div>
                        </div>
                        {
                          (component.type === 'Sensor') && (
                            <ul className="flex flex-col">
                              <Divider changePadding="p-[5px]" changeColor="border-black" />

                              {
                                component.variables
                                  .map((variable) => (
                                    <li
                                      key={`${component.component_id}${variable.variable_id}`}
                                      className="pt-[5px]"
                                    >
                                      <div>
                                        {variable.name}
                                      </div>
                                    </li>
                                  ))
                              }
                            </ul>
                          )
                        }
                      </div>
                    </li>
                  ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-5" />
    </div>

    {
      (selectedWorkspace.is_admin) && (
        <div className="flex w-full gap-2.5">
          {
            (selectedNode.state !== 'Terminado') && (
              <>
                <Button
                  text="Codigo"
                  typeIsButton
                  onClick={() => changeView('NodeCodeInfo')}
                  color="gray"
                />
                <Button
                  text="Modificar"
                  typeIsButton
                  onClick={() => changeManagementView('ManagementMenu')}
                  color="blue"
                />
              </>
            )
          }

          <Button
            text="Eliminar"
            typeIsButton
            onClick={() => changeView('DeleteNode')}
            color="red"
          />
        </div>
      )
    }
  </div>
);

const NodeOverview = ({
  selectedNode, nodeComponents, updateNodes, changeView, close,
}) => {
  const { selectedWorkspace } = useOutletContext();

  const [view, setView] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);

  // const renderView = () => {
  //   switch (view) {
  //     case 'UpdateName':
  //       return (
  //         <UpdateName resetView={() => setView(null)} />
  //       );
  //     case 'UpdateEmail':
  //       return (
  //         <UpdateEmail resetView={() => setView(null)} />
  //       );
  //     case 'UpdatePassword':
  //       return (
  //         <UpdatePassword resetView={() => setView(null)} />
  //       );
  //     default:
  //       return (
  //         (isScreenSM)
  //           ? (
  //             <Overview changeView={(value) => setView(value)} />
  //           )
  //           : (
  //             <LocationInMap
  //               coordinates={[selectedNode.lat, selectedNode.long]}
  //             />
  //           )
  //       );
  //   }
  // };

  const renderView = () => {
    switch (view) {
      case 'NodeCodeInfo':
        return (
          <NodeCodeInfo
            selectedNode={selectedNode}
            changeView={(value) => setView(value)}
          />
        );
      case 'DeleteNode':
        return (
          <DeleteNode
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
            resetView={() => changeView()}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <Overview
                selectedWorkspace={selectedWorkspace}
                selectedNode={selectedNode}
                nodeComponents={nodeComponents}
                isScreenSM={isScreenSM}
                setIsMapOpen={setIsMapOpen}
                changeView={(value) => setView(value)}
                changeManagementView={(value) => changeView(value)}
                close={() => close()}
              />
            )
            : (
              <LocationInMap
                coordinates={{ lat: selectedNode.lat, long: selectedNode.long }}
              />
            )
        );
    }
  };

  return (
    <div className="relative flex h-full w-full bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden h-full w-full bg-background sm:flex">
        <Overview
          selectedWorkspace={selectedWorkspace}
          selectedNode={selectedNode}
          nodeComponents={nodeComponents}
          isScreenSM={isScreenSM}
          setIsMapOpen={setIsMapOpen}
          changeView={(value) => setView(value)}
          changeManagementView={(value) => changeView(value)}
          close={() => close()}
        />
      </div>

      <div className="flex h-full w-full bg-background">
        {renderView()}
      </div>

      {
        (isScreenSM) && (isMapOpen) && (
          <div className="absolute h-full w-full">
            <LocationInMap
              coordinates={{ lat: selectedNode.lat, long: selectedNode.long }}
              isScreenSM={isScreenSM}
              changeView={() => setIsMapOpen(false)}
            />
          </div>
        )
      }
    </div>
  );
};

export default NodeOverview;
