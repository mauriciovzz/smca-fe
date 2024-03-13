import { React } from 'react';

import { Divider, Heading } from 'src/components';

const OverviewButton = ({ title, onClick }) => (
  <button
    type="button"
    className="flex h-full w-full items-center justify-center rounded-lg border p-2.5 text-lg font-medium shadow hover:bg-background"
    onClick={() => onClick()}
  >
    {title}
  </button>
);

const ManagementMenu = ({ changeView }) => (
  <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
    <Heading
      text="Actualizar Nodo"
      hasButton
      onButtonClick={() => changeView(null)}
    />

    <Divider />

    <div className="grid grow grid-cols-2 grid-rows-3 gap-5">
      <OverviewButton
        title="Actualizar Nombre"
        onClick={() => changeView('UpdateName')}
      />
      <OverviewButton
        title="Actualizar Estado"
        onClick={() => changeView('UpdateState')}
      />
      <OverviewButton
        title="Actualizar Tipo"
        onClick={() => changeView('UpdateType')}
      />
      <OverviewButton
        title="Actualizar Visibilidad"
        onClick={() => changeView('UpdateVisibility')}
      />
      <OverviewButton
        title="Actualizar Ubicación"
        onClick={() => changeView('UpdateLocation')}
      />
      <OverviewButton
        title="Actualizar Componentes"
        onClick={() => changeView('UpdateComponents')}
      />
    </div>
  </div>
);

export default ManagementMenu;
