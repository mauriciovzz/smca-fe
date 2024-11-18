import { React } from 'react';

import { NavLink } from 'react-router-dom';

import { arrowIcon } from 'src/assets';
import { Divider, Heading, Label } from 'src/components/ui';

const OverviewNavLink = ({
  title, value, isColorValue, to, isAccesible,
}) => {
  const renderValue = () => {
    if (value) {
      if (isColorValue) {
        return (
          <div className="flex w-1/2 flex-col items-start sm:w-1/3">
            <Label text={title} />
            <div className="h-[24px] w-full rounded-lg border p-0.5">
              <div className="size-full rounded-lg" style={{ backgroundColor: value }} />
            </div>
          </div>
        );
      }
      return (
        <div className="self-center text-left">
          <Label text={title} />
          <p className="w-full overflow-hidden break-words text-left">
            {value}
          </p>
        </div>
      );
    }
    return (
      <div className="self-center font-semibold">
        {title}
      </div>
    );
  };

  const renderArrow = () => (
    <img
      src={arrowIcon}
      alt="arrow"
      className={`${!isAccesible && 'hidden'} size-[28px] rotate-180 self-center`}
    />
  );

  const renderLink = () => ((isAccesible)
    ? (
      <NavLink
        className={({ isActive }) => `${isActive ? 'bg-background' : 'hover:bg-background'} p-5 flex justify-between`}
        to={to}
      >
        {renderValue()}
        {renderArrow()}
      </NavLink>
    )
    : (
      <div className="flex justify-between p-5">
        {renderValue()}
        {renderArrow()}
      </div>
    ));

  return (renderLink());
};

const SpaceSettingsOverview = ({ spaceData }) => (
  <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
    <Heading text="Ajustes" />
    <Divider changeBottomPadding="p-0" />

    <div className="flex size-full flex-col divide-y">
      <OverviewNavLink
        title="Nombre"
        value={spaceData.name}
        to="actualizar-nombre"
        isAccesible={spaceData.is_admin}
      />

      <OverviewNavLink
        title="Color"
        value={spaceData.color}
        isColorValue
        to="actualizar-color"
        isAccesible={spaceData.is_admin}
      />

      <OverviewNavLink
        title="Abandonar Espacio"
        to="abandonar-espacio"
        isAccesible
      />

      {
        (spaceData.is_admin) && (
          <OverviewNavLink
            title="Eliminar Espacio"
            to="eliminar-espacio"
            isAccesible
          />
        )
      }
    </div>
  </div>
);

export default SpaceSettingsOverview;
