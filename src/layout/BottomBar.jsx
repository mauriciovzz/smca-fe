import { React, useState } from 'react';

import { NavLink, useOutletContext } from 'react-router-dom';

import {
  airWave, close, locationIcon, map, memory, menu,
  nodeIcon, reports, settings, usersIcon, workspacesIcon,
} from 'src/assets';
import { BackdropFilter } from 'src/components';

const BottomBar = ({ workspaceId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setView } = useOutletContext();

  const navLinks = [
    {
      title: 'Mapa',
      route: `/espacios-de-trabajo/${workspaceId}`,
      src: map,
      alt: 'map',
      barOrder: 'order-3',
      menuOrder: 'order-1',
    },
    {
      title: 'Reportes',
      route: `/espacios-de-trabajo/${workspaceId}/reportes`,
      src: reports,
      alt: 'reports',
      barOrder: 'order-2',
      menuOrder: 'order-2',
    },
    {
      title: 'Miembros',
      route: `/espacios-de-trabajo/${workspaceId}/miembros`,
      src: usersIcon,
      alt: 'users',
      barOrder: 'order-4',
      menuOrder: 'order-3',
    },
    {
      title: 'Nodos',
      route: '/cuenta/nodos',
      src: nodeIcon,
      alt: 'pin',
      menuOrder: 'order-4',
    },
    {
      title: 'Ubicaciones',
      route: `/espacios-de-trabajo/${workspaceId}/ubicaciones`,
      src: locationIcon,
      alt: 'locations',
      menuOrder: 'order-5',
    },
    {
      title: 'Componentes',
      route: `/espacios-de-trabajo/${workspaceId}/componentes`,
      src: memory,
      alt: 'components',
      menuOrder: 'order-6',
    },
    {
      title: 'Variables',
      route: `/espacios-de-trabajo/${workspaceId}/variables`,
      src: airWave,
      alt: 'variables',
      menuOrder: 'order-7',
    },
    {
      title: 'Ajustes',
      route: `/espacios-de-trabajo/${workspaceId}/ajustes`,
      src: settings,
      alt: 'settings',
      menuOrder: 'order-8',
    },
    {
      title: 'Espacios',
      route: '/espacios-de-trabajo',
      src: workspacesIcon,
      alt: 'workspaces',
      barOrder: 'order-1',
      menuOrder: 'order-9',
    },
  ];

  const onOpenMenuClick = (linkAlt) => {
    if (linkAlt === 'workspaces') setView(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`${isMenuOpen && 'absolute bottom-0 left-0 p-5'} flex h-fit w-full bg-transparent`}>
        <nav className={`${isMenuOpen ? 'z-[70] divide-y' : 'z-[20]'} relative flex h-full w-full flex-col items-center justify-between rounded-lg bg-white px-5 shadow`}>
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} grid h-[320px] w-full grid-cols-3 grid-rows-3 justify-items-center gap-5 py-5`}>
            {
              navLinks
                .map((link) => (
                  <li key={link.alt} className={`${link.menuOrder} h-full w-full`}>
                    <NavLink
                      className={({ isActive }) => (`${isActive && 'bg-background'} flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg`)}
                      onClick={() => onOpenMenuClick(link.alt)}
                      to={link.route}
                      end
                    >
                      <img
                        src={link.src}
                        alt={link.alt}
                        className="h-[35px] w-[35px]"
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
                      onClick={(link.alt === 'workspaces') ? (() => setView(null)) : undefined}
                      to={link.route}
                      end
                    >
                      <img
                        src={link.src}
                        alt={link.alt}
                        className="h-[20px] w-[20px]"
                      />
                    </NavLink>
                  </li>
                ))
            }

            <button
              type="button"
              className="order-last flex h-fit w-fit flex-col items-center rounded-md p-2.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src={isMenuOpen ? close : menu}
                alt={isMenuOpen ? 'close' : 'menu'}
                className="h-[20px] w-[20px]"
              />
            </button>
          </ul>
        </nav>
      </div>

      {isMenuOpen && <BackdropFilter index="z-[60]" /> }
    </>
  );
};

export default BottomBar;
