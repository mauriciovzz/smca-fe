import { React } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import { Badge, Divider, Heading } from 'src/components';

const VariableList = ({ variables, selectVariable, changeView }) => {
  const { selectedWorkspace } = useOutletContext();

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <div className="flex justify-between">
          <Heading text="Variables" />

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
                  className="size-[25px] sm:size-[36px]"
                />
              </button>
            )
          }
        </div>

        <Divider />

        <div className="relative size-full">
          <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
            {
              variables
                .map((variable) => (
                  <li
                    key={variable.variable_id}
                    className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                  >
                    <button
                      type="button"
                      onClick={() => selectVariable(variable)}
                      className="flex h-fit w-full items-center justify-between"
                    >
                      <div>
                        <div className="text-left font-medium">
                          {variable.name}
                        </div>
                        <div className="text-left text-sm text-gray-500">
                          {variable.unit}
                        </div>
                      </div>

                      <Badge value={variable.type} />
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

export default VariableList;
