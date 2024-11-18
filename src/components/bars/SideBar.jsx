import { React, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  variableIcon, arrowIcon, locationIcon, mapIcon, componentIcon,
  nodeIcon, reportsIcon, settingsIcon, usersIcon, spaceIcon,
} from 'src/assets';

const NavLinkItem = ({ link, isMenuOpen }) => (
  <NavLink
    className={({ isActive }) => (`${isActive && 'bg-background'} flex w-fit cursor-pointer items-center rounded-md p-1.5 text-xs text-gray-300 hover:bg-slate-100 sm:p-2 sm:text-sm`)}
    to={link.route}
    end
  >
    <img
      src={link.src}
      alt={link.alt}
      className="size-[24px]"
    />
    <span className={`${!isMenuOpen && 'hidden'} mx-2 w-[90px] origin-left text-slate-500 duration-200`}>
      {link.title}
    </span>
  </NavLink>
);

const SideBar = ({ spaceId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const navLinks = [
    {
      title: 'Mapa',
      route: `/espacios/${spaceId}`,
      src: mapIcon,
      alt: 'map',
    },
    {
      title: 'Reportes',
      route: `/espacios/${spaceId}/reportes`,
      src: reportsIcon,
      alt: 'reports',
    },
    {
      title: 'Miembros',
      route: `/espacios/${spaceId}/miembros`,
      src: usersIcon,
      alt: 'accounts',
    },
    {
      title: 'Nodos',
      route: `/espacios/${spaceId}/nodos`,
      src: nodeIcon,
      alt: 'nodes',
    },
    {
      title: 'Ubicaciones',
      route: `/espacios/${spaceId}/ubicaciones`,
      src: locationIcon,
      alt: 'locations',
    },
    {
      title: 'Componentes',
      route: `/espacios/${spaceId}/componentes`,
      src: componentIcon,
      alt: 'components',
    },
    {
      title: 'Variables',
      route: `/espacios/${spaceId}/variables`,
      src: variableIcon,
      alt: 'variables',
    },
    {
      title: 'Ajustes',
      route: `/espacios/${spaceId}/ajustes`,
      src: settingsIcon,
      alt: 'settings',
      bottom: true,
    },
    {
      title: 'Espacios',
      route: '/espacios',
      src: spaceIcon,
      alt: 'spaces',
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
            src={arrowIcon}
            alt="arrow"
            className={`${!isMenuOpen && 'rotate-180'} cursor-pointer rounded-full border-2 border-black bg-white`}
          />
        </button>

        <div className="flex h-full flex-col justify-between">
          <ul className="flex flex-col space-y-1">
            {
              navLinks
                .filter((link) => !link.bottom)
                .map((link) => (
                  <li key={link.alt}><NavLinkItem link={link} isMenuOpen={isMenuOpen} /></li>
                ))
            }
          </ul>

          <ul className="flex flex-col space-y-1">
            {
              navLinks
                .filter((link) => link.bottom)
                .map((link) => (
                  <li key={link.alt}><NavLinkItem link={link} isMenuOpen={isMenuOpen} /></li>
                ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
