import { React } from 'react';

import { NavLink } from 'react-router-dom';

import { control } from 'src/assets';
import { Divider, Heading, Label } from 'src/components';

const OverviewNavLink = ({ title, value, to }) => (
  <NavLink
    className={({ isActive }) => `${isActive ? 'bg-background' : 'hover:bg-background'} py-5 flex justify-between`}
    to={to}
  >
    <div className="self-center text-left">
      <Label text={title} noBottomMargin={!value} />
      {value && <div>{value}</div>}
    </div>

    <img
      src={control}
      alt="control arrow"
      className="size-[28px] rotate-180 self-center"
    />
  </NavLink>
);

const AccountOverview = ({ accountData }) => (
  <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
    <Heading text="Cuenta" />
    <Divider noBottomPadding />

    <div className="flex grow flex-col divide-y">
      <OverviewNavLink
        title="Nombre"
        value={`${accountData.firstName} ${accountData.lastName}`}
        to="actualizar-nombre"
      />
      <OverviewNavLink
        title="Correo Electrónico"
        value={accountData.email}
        to="actualizar-correo-electronico"
      />
      <OverviewNavLink
        title="Contraseña"
        value="●●●●●●●● "
        to="actualizar-contraseña"
      />
      <OverviewNavLink
        title="Eliminar Cuenta"
        to="eliminar-cuenta"
      />
    </div>
  </div>
);

export default AccountOverview;
