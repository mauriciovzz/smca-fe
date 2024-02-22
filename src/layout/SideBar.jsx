import { React, useState } from 'react';

import { NavLink, useOutletContext } from 'react-router-dom';

import {
  airWave, control, locationIcon, map, memory, nodeIcon, reports, settings, usersIcon,
} from 'src/assets';

const NavLinkItem = ({ link, isMenuOpen, setView }) => (
  <NavLink
    className={({ isActive }) => (`${isActive && 'bg-background'} ${link.order} flex w-fit cursor-pointer items-center rounded-md p-1.5 text-xs text-gray-300 hover:bg-slate-100 sm:p-2 sm:text-sm`)}
    onClick={(link.alt === 'return') && (() => setView(null))}
    to={link.route}
    end
  >
    <img
      src={link.src}
      alt={link.alt}
      className="h-[24px] w-[24px]"
    />
    <span className={`${!isMenuOpen && 'hidden'} mx-2 w-[90px] origin-left text-slate-500 duration-200`}>
      {link.title}
    </span>
  </NavLink>
);

const SideBar = ({ workspaceId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setView } = useOutletContext();

  const navLinks = [
    {
      title: 'Mapa',
      route: `/espacios-de-trabajo/${workspaceId}`,
      src: map,
      alt: 'map',
      order: 'order-1',
    },
    {
      title: 'Reportes',
      route: `/espacios-de-trabajo/${workspaceId}/reportes`,
      src: reports,
      alt: 'reports',
      order: 'order-2',
    },
    {
      title: 'Miembros',
      route: `/espacios-de-trabajo/${workspaceId}/miembros`,
      src: usersIcon,
      alt: 'accounts',
      order: 'order-3',
    },
    {
      title: 'Nodos',
      route: '/cuenta/nodos',
      src: nodeIcon,
      alt: 'nodes',
      order: 'order-4',
    },
    {
      title: 'Ubicaciones',
      route: '/cuenta/ubicaciones',
      src: locationIcon,
      alt: 'locations',
      order: 'order-5',
    },
    {
      title: 'Componentes',
      route: '/cuenta/componentes',
      src: memory,
      alt: 'components',
      order: 'order-6',
    },
    {
      title: 'Variables',
      route: '/cuenta/variables',
      src: airWave,
      alt: 'variables',
      order: 'order-7',
    },
    {
      title: 'Ajustes',
      route: `/espacios-de-trabajo/${workspaceId}/ajustes`,
      src: settings,
      alt: 'settings',
      order: 'order-8',
      bottom: true,
    },
    {
      title: 'Regresar',
      route: '/espacios-de-trabajo',
      src: control,
      alt: 'return',
      bottomMenuOrder: 'order-1',
      order: 'order-9',
      bottom: true,
    },
  ];

  return (
    <nav className="flex h-full bg-transparent">
      <div className={`${isMenuOpen ? 'w-[180px]' : 'w-[80px]'} relative flex h-full flex-col rounded-lg bg-white p-5 shadow`}>
        <button
          type="button"
          className="absolute -right-3 py-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={control}
            alt="control arrow"
            className={`${!isMenuOpen && 'rotate-180'} cursor-pointer rounded-full border-2 border-black bg-white`}
          />
        </button>

        <div className="flex h-full flex-col justify-between">
          <ul className="flex flex-col space-y-1">
            {
              navLinks
                .filter((link) => !link.bottom)
                .map((link) => (
                  <li key={link.alt}>
                    <NavLinkItem link={link} isMenuOpen={isMenuOpen} setView={setView} />
                  </li>
                ))
            }
          </ul>

          <ul className="flex flex-col space-y-1">
            {
              navLinks
                .filter((link) => link.bottom)
                .map((link) => (
                  <li key={link.alt}>
                    <NavLinkItem link={link} isMenuOpen={isMenuOpen} setView={setView} />
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
