import { React, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  variableIcon, closeIcon, locationIcon, mapIcon, componentIcon, menuIcon,
  nodeIcon, readingsIcon, settingsIcon, usersIcon, spaceIcon,
} from 'src/assets';
import { BlurEffect } from 'src/components/ui';

const BottomBar = ({ spaceId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      title: 'Mapa',
      route: `/espacios/${spaceId}`,
      src: mapIcon,
      alt: 'map',
      barOrder: 'order-3',
      menuOrder: 'order-1',
    },
    {
      title: 'Reportes',
      route: `/espacios/${spaceId}/reportes`,
      src: readingsIcon,
      alt: 'readings',
      barOrder: 'order-2',
      menuOrder: 'order-2',
    },
    {
      title: 'Miembros',
      route: `/espacios/${spaceId}/miembros`,
      src: usersIcon,
      alt: 'users',
      barOrder: 'order-4',
      menuOrder: 'order-3',
    },
    {
      title: 'Nodos',
      route: `/espacios/${spaceId}/nodos`,
      src: nodeIcon,
      alt: 'pin',
      menuOrder: 'order-4',
    },
    {
      title: 'Ubicaciones',
      route: `/espacios/${spaceId}/ubicaciones`,
      src: locationIcon,
      alt: 'locations',
      menuOrder: 'order-5',
    },
    {
      title: 'Componentes',
      route: `/espacios/${spaceId}/componentes`,
      src: componentIcon,
      alt: 'components',
      menuOrder: 'order-6',
    },
    {
      title: 'Variables',
      route: `/espacios/${spaceId}/variables`,
      src: variableIcon,
      alt: 'variables',
      menuOrder: 'order-7',
    },
    {
      title: 'Ajustes',
      route: `/espacios/${spaceId}/ajustes`,
      src: settingsIcon,
      alt: 'settings',
      menuOrder: 'order-8',
    },
    {
      title: 'Espacios',
      route: '/espacios',
      src: spaceIcon,
      alt: 'workspaces',
      barOrder: 'order-1',
      menuOrder: 'order-9',
    },
  ];

  return (
    <>
      <div className={`${isMenuOpen && 'absolute bottom-0 left-0 p-5'} w-full bg-transparent`}>
        <nav className={`${isMenuOpen ? 'z-[70] divide-y' : 'z-20'} relative flex size-full flex-col items-center justify-between rounded-lg bg-white px-5 shadow`}>
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} grid h-[320px] w-full grid-cols-3 grid-rows-3 justify-items-center gap-5 py-5`}>
            {
              navLinks
                .map((link) => (
                  <li key={link.alt} className={`${link.menuOrder} size-full`}>
                    <NavLink
                      className={({ isActive }) => (`${isActive && 'bg-background'} flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg`)}
                      onClick={() => setIsMenuOpen(false)}
                      to={link.route}
                      end
                    >
                      <img
                        src={link.src}
                        alt={link.alt}
                        className="size-[35px]"
                      />
                      <span className="text-xs text-slate-500">
                        {link.title}
                      </span>
                    </NavLink>
                  </li>
                ))
              }
          </ul>

          <ul className="flex w-full justify-evenly py-2.5">
            {
              navLinks
                .filter((link) => link.barOrder)
                .map((link) => (
                  <li key={link.alt} className={`${link.barOrder}`}>
                    <NavLink
                      className={({ isActive }) => (`${isActive && 'bg-background'} flex rounded-md p-2.5`)}
                      onClick={() => setIsMenuOpen(false)}
                      to={link.route}
                      end
                    >
                      <img
                        src={link.src}
                        alt={link.alt}
                        className="size-[20px]"
                      />
                    </NavLink>
                  </li>
                ))
            }

            <button
              type="button"
              className="order-last flex size-fit flex-col items-center rounded-md p-2.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src={isMenuOpen ? closeIcon : menuIcon}
                alt={isMenuOpen ? 'close' : 'menu'}
                className="size-[20px]"
              />
            </button>
          </ul>
        </nav>
      </div>

      {isMenuOpen && <BlurEffect index="z-[60]" /> }
    </>
  );
};

export default BottomBar;
