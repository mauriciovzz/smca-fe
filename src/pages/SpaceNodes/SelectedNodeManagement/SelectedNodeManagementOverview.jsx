import { React } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { arrowIcon } from 'src/assets';
import { Divider, Heading, Label } from 'src/components/ui';

const OverviewNavLink = ({ title, value, to }) => (
  <NavLink
    className={({ isActive }) => `${isActive ? 'bg-background' : 'hover:bg-background'} pl-5 py-5 flex justify-between`}
    to={to}
  >
    {
      value
        ? (
          <div className="self-center text-left">
            <Label text={title} />
            <p className="w-full overflow-hidden break-words text-left">
              {value}
            </p>
          </div>
        )
        : (
          <div className="self-center font-semibold">
            {title}
          </div>
        )
    }

    <img
      src={arrowIcon}
      alt="arrow"
      className="size-[25px] rotate-180 self-center sm:size-[30px]"
    />
  </NavLink>
);

const SelectedNodeManagementOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Ajustes del Nodo"
        hasButton
        onButtonClick={() => navigate('..')}
      />

      <Divider changeBottomPadding="p-0" />

      <div className="flex grow flex-col divide-y">
        <OverviewNavLink
          title="Descargar Configuración"
          to="descargar-configuracion"
        />
        <OverviewNavLink
          title="Actualizar Información"
          to="informacion"
        />
        <OverviewNavLink
          title="Actualizar Componentes"
          to="componentes"
        />
        <OverviewNavLink
          title="Actualizar Ubicación"
          to="ubicacion"
        />
        <OverviewNavLink
          title="Eliminar Nodo"
          to="eliminar"
        />
      </div>
    </div>
  );
};

export default SelectedNodeManagementOverview;
