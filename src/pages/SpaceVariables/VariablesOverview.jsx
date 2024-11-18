import { React } from 'react';

import { Link } from 'react-router-dom';

import { addIcon } from 'src/assets';
import { Divider, Heading, VariableLabel } from 'src/components/ui';

const VariablesOverview = ({ spaceData, variablesData }) => (
  <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
    <div className="flex grow flex-col">
      <div className="flex justify-between">
        <Heading text="Variables" />

        {
            (spaceData.is_admin) && (
              <Link className="self-start" to="agregar">
                <img
                  src={addIcon}
                  alt="add user"
                  className="size-[25px] sm:size-[36px]"
                />
              </Link>
            )
          }
      </div>

      <Divider />

      <div className="relative size-full">
        <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
          {
              variablesData
                .map((variable) => (
                  <li
                    key={variable.variable_id}
                    className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                  >
                    <Link
                      className="flex h-fit w-full space-x-5"
                      to={`${variable.variable_id}`}
                    >
                      <div className="flex size-full flex-col">
                        <VariableLabel variable={variable} />

                        <div className="break-words text-left font-medium">
                          {variable.name}
                        </div>
                        <div className=" text-xs font-medium text-gray-500">
                          {variable.unit}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
            }
        </ul>
      </div>
    </div>
  </div>
);

export default VariablesOverview;
