import { React } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Badge, Button, Divider, Heading,
} from 'src/components';

const NodeOverview = ({
  selectedNode, nodeComponents, changeView, close,
}) => {
  const { selectedWorkspace } = useOutletContext();

  return (
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
          </div>

          <div className="flex h-fit w-full space-x-2.5">
            <Badge value={selectedNode.state} width="w-1/3" rounded="rounded-lg" />
            <Badge value={selectedNode.type} width="w-1/3" rounded="rounded-lg" />
            <Badge value={selectedNode.is_visible ? 'Público' : 'Privado'} width="w-1/3" rounded="rounded-lg" />
          </div>

          <div className="flex grow flex-col">
            <div className="relative flex grow overflow-hidden rounded-lg border">
              <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-background">
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
                    onClick={() => changeView('ManagementMenu')}
                    color="gray"
                  />
                  <Button
                    text="Modificar"
                    typeIsButton
                    onClick={() => changeView('ManagementMenu')}
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
};

export default NodeOverview;
