import { React, useState } from 'react';

import { addIcon } from 'src/assets';
import { Divider, SelectionBar } from 'src/components';
import ComponentCreation from 'src/pages/Components/ComponentCreation';

const ComponentSelection = ({
  text, components, updateComponents, selectedComponents, selectComponent,
  rightButtonClick, leftButtonClick,
}) => {
  const [isComCreOpen, setIsComCreOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
      <SelectionBar
        text={text}
        rightAction={rightButtonClick}
        leftAction={leftButtonClick}
      />

      <Divider changePadding="p-[5px]" />

      <div className="flex h-full w-full flex-col space-y-2.5">
        <div className="relative h-full w-full">
          <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
            {
              components
                .map((component) => (
                  <li
                    key={component.component_id}
                    className={`${selectedComponents.map((sc) => sc.component_id).includes(component.component_id) ? 'bg-sky-200' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-5 shadow`}
                  >
                    <button
                      type="button"
                      onClick={() => selectComponent(component)}
                      className="flex h-fit w-full space-x-5"
                    >
                      <div className="flex h-full w-full font-semibold">
                        {component.name}
                      </div>
                    </button>
                  </li>
                ))
            }
            <li className="h-fit w-full border-b bg-white px-5 py-2.5 shadow hover:bg-slate-100">
              <button
                type="button"
                onClick={() => setIsComCreOpen(true)}
                className="flex w-full items-center justify-center space-x-2.5"
              >
                <img
                  src={addIcon}
                  alt="add icon"
                />
                <div>Agregar Componente</div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {
        isComCreOpen && (
          <div className="absolute left-0 top-0 h-full w-full">
            <ComponentCreation
              updateComponents={updateComponents}
              changeView={() => setIsComCreOpen(false)}
            />
          </div>
        )
       }
    </div>
  );
};

export default ComponentSelection;
