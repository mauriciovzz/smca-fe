import { React } from 'react';

import { control } from 'src/assets';
import { Divider, Heading } from 'src/components';

const OverviewButton = ({ title, isFirst, onClick }) => (
  <button
    type="button"
    className={`${isFirst ? 'pb-5' : 'py-5'} flex justify-between hover:bg-background`}
    onClick={() => onClick()}
  >
    <div className="self-center font-semibold">{title}</div>

    <img
      src={control}
      alt="control arrow"
      className="h-[28px] w-[28px] rotate-180 self-center"
    />
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

    <div className="flex grow flex-col divide-y">
      <OverviewButton
        title="Actualizar Estado"
        isFirst
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
