import { React } from 'react';

import { Divider, SelectionBar } from 'src/components';

const Overview = ({
  nodeComponents, nodeVariables, nodeLocation, nodeType, nodeVisibility,
  leftButtonClick, rightButtonClick,
}) => {
  const isVariableSelected = (variable) => (
    nodeVariables
      .find(
        (nv) => nv.component_id === variable.component_id
          && nv.variable_id === variable.variable_id,
      )
  );

  const typeBadge = (type) => {
    switch (type) {
      case 'Indoor':
        return (
          <div className="flex h-[24px] w-1/2 items-center justify-center rounded-lg bg-slate-500 text-center text-sm font-medium text-white">
            Indoor
          </div>
        );
      case 'Outdoor':
        return (
          <div className="flex h-[24px] w-1/2 items-center justify-center rounded-lg bg-sky-500 text-center text-sm font-medium text-white">
            Outdoor
          </div>
        );
      default:
        return (
          <div className="flex h-[24px] w-1/2 items-center justify-center rounded-lg bg-white text-center text-sm font-medium">
            n/s
          </div>
        );
    }
  };

  const visibilityBadge = (visibility) => {
    switch (visibility) {
      case 'Publico':
        return (
          <div className="flex h-[24px] w-1/2 items-center justify-center rounded-lg bg-sky-500 text-center text-sm font-medium text-white">
            Publico
          </div>
        );
      case 'Privado':
        return (
          <div className="flex h-[24px] w-1/2 items-center justify-center rounded-lg bg-slate-500 text-center text-sm font-medium text-white">
            Privado
          </div>
        );
      default:
        return (
          <div className="flex h-[24px] w-1/2 items-center justify-center rounded-lg bg-white text-center text-sm font-medium">
            n/s
          </div>
        );
    }
  };

  const componentTypeBadge = (type) => {
    switch (type) {
      case 'Placa':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center rounded-3xl bg-[#9DB28C] text-sm font-medium text-white">
            placa
          </div>
        );
      case 'Sensor':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center rounded-3xl bg-[#C8C8C7] text-sm font-medium text-white">
            sensor
          </div>
        );
      case 'Camara':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center rounded-3xl bg-[#8F8D8E] text-sm font-medium text-white">
            camara
          </div>
        );
      case 'Pantalla':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center rounded-3xl bg-[#A3A6B5] text-sm font-medium text-white">
            pantalla
          </div>
        );
      case 'Otro':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center rounded-3xl bg-[#A89A8E] text-sm font-medium text-white">
            otro
          </div>
        );
      default:
        return (
          <div />
        );
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
      <SelectionBar
        text="Confirmar Nodo"
        leftAction={leftButtonClick}
        rightAction={rightButtonClick}
      />

      <Divider changePadding="p-[5px]" />

      <div className="flex h-full w-full flex-col space-y-5">
        <div className="flex h-fit w-full items-center justify-center text-center font-semibold">
          {(nodeLocation.name) ? (nodeLocation.name) : 'n/s'}
        </div>

        <div className="flex h-fit w-full space-x-2.5">
          {typeBadge(nodeType.type)}
          {visibilityBadge(nodeVisibility.type)}
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
                            {componentTypeBadge(component.type)}
                          </div>
                        </div>
                        {
                          (component.type === 'Sensor') && (
                            <ul className="flex flex-col">
                              <Divider changePadding="p-[5px]" changeColor="border-black" />

                              {
                                component.variables
                                  .filter((variable) => isVariableSelected(variable))
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
    </div>
  );
};

export default Overview;
