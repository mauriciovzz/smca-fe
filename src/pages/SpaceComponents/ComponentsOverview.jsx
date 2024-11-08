import { React } from 'react';

import { Link } from 'react-router-dom';

import { addIcon } from 'src/assets';
import { ComponentLabel, Divider, Heading } from 'src/components/ui';

const ComponentLink = ({ component }) => (
  <li className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100">
    <Link
      className="flex h-fit w-full space-x-5"
      to={`${component.component_id}`}
    >
      <div className="flex size-full flex-col">
        <ComponentLabel component={component} />

        <div className="break-words text-left font-medium">
          {component.name}
        </div>
      </div>
    </Link>
  </li>

);

const ComponentOverview = ({ spaceData, componentsData }) => (
  <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
    <div className="flex grow flex-col">
      <div className="flex justify-between">
        <Heading text="Componentes" />

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
        <ul className="small-scrollbar absolute flex size-full flex-col overflow-y-scroll rounded-lg border bg-background">
          {componentsData.filter((c) => c.type === 'board').map((component) => <ComponentLink component={component} key={`${component.component_id}`} />)}
          {componentsData.filter((c) => c.type === 'sensor').map((component) => <ComponentLink component={component} key={`${component.component_id}`} />)}
          {componentsData.filter((c) => c.type === 'rain_detector').map((component) => <ComponentLink component={component} key={`${component.component_id}`} />)}
          {componentsData.filter((c) => c.type === 'camera').map((component) => <ComponentLink component={component} key={`${component.component_id}`} />)}
          {componentsData.filter((c) => c.type === 'screen').map((component) => <ComponentLink component={component} key={`${component.component_id}`} />)}
          {componentsData.filter((c) => c.type === 'other').map((component) => <ComponentLink component={component} key={`${component.component_id}`} />)}
        </ul>
      </div>
    </div>
  </div>
);

export default ComponentOverview;
