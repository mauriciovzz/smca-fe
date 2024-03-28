import { React, useState } from 'react';

import { addIcon, checkCircleIcon, uncheckCircleIcon } from 'src/assets';
import { Divider, SelectionBar } from 'src/components';
import ComponentCreation from 'src/pages/Components/ComponentCreation';

const SensorSelection = ({
  sensors, updateComponents, selectedComponents,
  selectedVariables, selectVariable,
  leftButtonClick, rightButtonClick,
}) => {
  const [isComCreOpen, setIsComCreOpen] = useState(false);

  const isVariableCheked = (sensor, variable) => (
    (selectedVariables.find(
      (sv) => sv.component_id === sensor.component_id && sv.variable_id === variable.variable_id,
    ))
      ? checkCircleIcon
      : uncheckCircleIcon
  );

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
      <SelectionBar
        text="Selecionar Sensores"
        leftAction={leftButtonClick}
        rightAction={rightButtonClick}
      />

      <Divider changePadding="p-[5px]" />

      <div className="flex h-full w-full flex-col space-y-2.5">
        <div className="relative h-full w-full">
          <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
            {
              sensors
                .map((sensor) => (
                  <li
                    key={sensor.component_id}
                    className={`${selectedComponents.map((sc) => sc.component_id).includes(sensor.component_id) ? 'bg-sky-200' : 'bg-white'} h-fit w-full border-b p-5 shadow`}
                  >
                    <div className="flex h-full w-full flex-col">
                      <div className="text-left font-semibold">
                        {sensor.name}
                      </div>
                      <ul className="flex flex-col">
                        <Divider changePadding="p-[5px]" />

                        {
                          sensor.variables.map((variable) => (
                            <li
                              key={`${sensor.component_id}${variable.variable_id}`}
                              className="pt-[5px]"
                            >
                              <button
                                type="button"
                                className="flex w-full justify-between"
                                onClick={() => selectVariable(sensor, variable)}
                              >
                                <div>
                                  {variable.name}
                                </div>
                                <img
                                  src={isVariableCheked(sensor, variable)}
                                  alt="check icon"
                                  className="h-[24px] w-[24px]"
                                />
                              </button>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
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

export default SensorSelection;
