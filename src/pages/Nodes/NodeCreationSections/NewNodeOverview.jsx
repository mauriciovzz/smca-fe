import { React } from 'react';

import {
  Badge, Button, Divider, Heading, SelectionBar,
} from 'src/components';

const NewNodeOverview = ({
  name, type, visibility, location, nodeComponents, nodeVariables, rainSensor, createNode,
  isScreenSM, leftButtonClick, rightButtonClick,
}) => {
  const isVariableSelected = (componentType, variable) => (
    (componentType === 'Sensor de Lluvia')
      ? true
      : nodeVariables
        .find(
          (nv) => nv.component_id === variable.component_id
            && nv.variable_id === variable.variable_id,
        )
  );

  return (
    <div className={`${!isScreenSM && 'p-5'} relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5`}>
      {
        (isScreenSM)
          ? (
            <SelectionBar
              text="Confirmar Nodo"
              leftAction={leftButtonClick}
              rightAction={rightButtonClick}
            />
          )
          : (
            <Heading
              text="Confirmar Nodo"
            />
          )
      }

      <Divider changePadding="p-[5px]" />

      <div className="flex h-full w-full flex-col space-y-2.5">
        <div className="flex h-fit w-full items-center justify-center text-center font-semibold">
          {
            (name) ? `${name}` : 'Ingrese un Nombre'
          }
        </div>

        <div className="flex h-fit w-full items-center justify-center text-center font-semibold">
          {(location.name)
            ? (
              <div className="flex flex-col">
                <div className="text-sm font-medium">
                  {location.name}
                </div>
                <div className="text-xs text-gray-500">
                  {location.location}
                </div>
              </div>
            )
            : 'Seleccione una Ubicación'}
        </div>

        <div className="flex h-fit w-full space-x-2.5">
          <Badge value={type} width="w-1/2" />
          <Badge value={visibility} width="w-1/2" />
        </div>

        <div className="flex grow flex-col">
          <div className="relative flex grow overflow-hidden rounded-lg border">
            <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-scroll bg-background">
              {
                nodeComponents
                  .concat(rainSensor)
                  .sort((a, b) => (
                    a.component_type_id - b.component_type_id
                    || a.name.localeCompare(b.name)
                  ))
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
                          (component.type === 'Sensor' || component.type === 'Sensor de Lluvia') && (
                            <ul className="flex flex-col">
                              <Divider changePadding="p-[5px]" changeColor="border-black" />

                              {
                                component.variables
                                  .filter((variable) => isVariableSelected(
                                    component.type,
                                    variable,
                                  ))
                                  .sort((a, b) => (
                                    a.variable_type_id - b.variable_type_id
                                    || a.name.localeCompare(b.name)
                                  ))
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

        <Button
          text="Agregar Nodo"
          typeIsButton
          onClick={() => createNode()}
          color="blue"
        />
      </div>
    </div>
  );
};

export default NewNodeOverview;
