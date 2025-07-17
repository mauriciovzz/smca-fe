import { React } from 'react';

import { Button, ComponentListItem, SelectionBar } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';

const NewNodeOverview = ({
  name, isIndoor, location, components,
  handleNodeCreation, previousPage, isScreenSmall,
  nodeCreated,
}) => (
  <div className={`${!isScreenSmall ? 'rounded-lg border p-5' : 'gap-5'} relative flex size-full flex-col bg-white`}>
    {
      (isScreenSmall)
        ? (<SelectionBar text="Confirmar Nodo" leftAction={previousPage} />)
        : (
          <>
            <Heading text="Nuevo Nodo" />
            <Divider changeBottomPadding="p-0" />
          </>
        )
    }

    <div className="flex size-full flex-col gap-2.5 sm:gap-5">
      <div className="flex grow flex-col">
        <div className={`${isScreenSmall ? 'h-[20px]' : 'h-[43px]'} flex divide-x border-b`}>
          <div className="flex w-1/2 items-center justify-between px-2.5">
            <span className="text-xs font-bold">NOMBRE</span>
            <span className="text-sm font-light">{name || 'no ingresado'}</span>
          </div>

          <div className="flex w-1/2 items-center justify-between px-2.5">
            <span className="flex text-xs font-bold">TIPO</span>
            <span className="flex text-sm font-light">{isIndoor ? 'indoor' : 'outdoor'}</span>
          </div>
        </div>

        <div className="flex w-full flex-col px-2.5 pt-2.5">
          <span className="text-xs font-bold">UBICACION</span>
          <span className="text-sm font-light">{location ? location.location_name : 'Ubicacion no seleccionada'}</span>
        </div>

        <Divider changePadding={isScreenSmall ? 'p-[10px]' : 'p-[5px]'} />

        <div className="relative flex grow flex-col">
          <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
            {components.filter((c) => c.type === 'board').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
            {components.filter((c) => c.type === 'sensor').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
            {components.filter((c) => c.type === 'rain_detector').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
            {components.filter((c) => c.type === 'camera').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
            {components.filter((c) => c.type === 'other').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
          </ul>
        </div>
      </div>

      {(!nodeCreated) && (
        <Button
          text="Crear Nodo"
          isTypeButton
          onClick={() => handleNodeCreation()}
          color="blue"
        />
      )}

    </div>
  </div>
);

export default NewNodeOverview;
