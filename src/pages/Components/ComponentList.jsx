import { React } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import {
  Divider, Heading,
} from 'src/components';

const ComponentList = ({ components, selectComponent, changeView }) => {
  const { selectedWorkspace } = useOutletContext();

  const componentTypeBadge = (type) => {
    switch (type) {
      case 'Placa':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center self-center rounded-3xl bg-[#9DB28C] text-sm font-medium text-white">
            placa
          </div>
        );
      case 'Sensor':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center self-center rounded-3xl bg-[#C8C8C7] text-sm font-medium text-white">
            sensor
          </div>
        );
      case 'Camara':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center self-center rounded-3xl bg-[#8F8D8E] text-sm font-medium text-white">
            camara
          </div>
        );
      case 'Pantalla':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center self-center rounded-3xl bg-[#A3A6B5] text-sm font-medium text-white">
            pantalla
          </div>
        );
      case 'Otro':
        return (
          <div className="flex h-[20px] w-[60px] items-center justify-center self-center rounded-3xl bg-[#A89A8E] text-sm font-medium text-white">
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
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <div className="flex justify-between">
          <Heading text="Componentes" />

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
              components
                .map((component) => (
                  <li
                    key={component.component_id}
                    className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                  >
                    <button
                      type="button"
                      onClick={() => selectComponent(component)}
                      className="flex h-fit w-full flex-col text-left"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="h-fit w-3/4 break-words font-medium">
                          {component.name}
                        </div>
                        <div className="flex w-1/4 justify-end">
                          {componentTypeBadge(component.type)}
                        </div>
                      </div>
                    </button>
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComponentList;
