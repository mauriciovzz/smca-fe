import { React, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  addIconWhite, adminIcon, bellIcon, nodeIcon, userIcon, usersIcon,
} from 'src/assets';
import { Divider, Heading } from 'src/components/ui';
import colorHelper from 'src/utils/colorHelper';

const SpacesOverview = ({ space }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/espacios/${space.space_id}`}
      state={{ spaceData: space }}
      className="flex h-fit w-full flex-col gap-2.5 rounded-lg p-5 shadow-lg sm:w-[230px]"
      style={{
        backgroundColor: isHovered
          ? colorHelper.getDarkerColor(space.color, 0.25)
          : space.color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="h-[50px] w-full overflow-hidden break-words text-left font-semibold">
        {space.name}
      </p>

      <div className="flex h-[25px] w-full justify-between">
        <div className="flex h-fit w-[25px] flex-col items-center">
          <img
            src={space.is_admin ? adminIcon : userIcon}
            alt={space.is_admin ? 'admin' : 'user'}
            className="size-[25px]"
          />
        </div>

        <div className="flex w-[55px] items-center justify-between">
          <img
            src={usersIcon}
            alt="users"
            className="size-[25px]"
          />

          <span className="text-sm">
            {space.members.padStart(3, '0')}
          </span>
        </div>

        <div className="flex h-fit w-[50px] items-center justify-between">
          <img
            src={nodeIcon}
            alt="nodes"
            className="size-[25px]"
          />

          <span className="text-sm">
            {/* {addZeros(space.nodes)} */}
            {'5'.padStart(3, '0')}
          </span>
        </div>
      </div>
    </Link>
  );
};

const SpaceOverview = ({ spacesData, invitationsCount }) => (
  <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
    <div className="flex justify-between">
      <Heading text="Espacios" />

      <Link
        to="invitaciones"
        className="relative self-start"
      >
        {
          !(invitationsCount === 0) && (
            <div className="absolute -right-2.5 -top-1.5 flex size-[20px] items-center justify-center rounded-xl bg-red-500 shadow sm:size-[25px]">
              <span className="size-fit text-xs font-bold text-white">
                {invitationsCount}
              </span>
            </div>
          )
        }

        <img
          src={bellIcon}
          alt="bell"
          className="size-[25px] sm:size-[36px]"
        />
      </Link>
    </div>

    <Divider />

    <div className="relative h-full">
      <ul className={`small-scrollbar absolute flex size-full flex-col justify-start space-y-5 overflow-y-scroll rounded-lg border bg-background p-5 shadow sm:inline-grid
                    sm:grid-cols-layout sm:justify-center sm:gap-5 sm:space-y-0`}
      >
        {spacesData.map((space) => <li key={space.space_id}><SpacesOverview space={space} /></li>)}

        <li>
          <Link
            className="flex h-fit w-full flex-col items-center gap-2.5 rounded-lg bg-main p-5 shadow-lg hover:bg-main-dark sm:w-[230px]"
            to="agregar"
          >
            <p className="h-[25px] w-full overflow-hidden break-words font-semibold text-white">
              Agregar Espacio
            </p>
            <img
              src={addIconWhite}
              alt="add"
              className="size-[50px]"
            />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default SpaceOverview;
