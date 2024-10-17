import { React, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';

import {
  accountIcon, close, helpIcon, infoIcon, loginIcon, logoutIcon, mapIcon, menu, workspacesIcon,
} from 'src/assets';
import { BackdropFilter } from 'src/components';

import useAuth from '../hooks/useAuth';

const Bar = ({
  navLinks, auth, logout, onClick,
}) => {
  const buttonColor = (isActive) => {
    if (auth) return 'bg-main hover:bg-main-dark';
    return (isActive) ? 'bg-main-dark' : 'bg-main hover:bg-main-dark';
  };

  return (
    <>
      {
        navLinks
          .filter(auth ? () => true : (link) => !link.needsAuth)
          .map((link) => (
            <li key={link.title}>
              <NavLink
                className={({ isActive }) => (`${isActive ? 'border-b-2 border-main py-1' : 'hover:text-main'}`)}
                to={link.route}
                onClick={() => onClick()}
              >
                {link.title}
              </NavLink>
            </li>
          ))
      }

      <li>
        <NavLink
          className={({ isActive }) => (`${buttonColor(isActive)} rounded-lg p-2 font-medium text-white`)}
          to={auth ? '/' : '/iniciar-sesion'}
          onClick={auth
            ? () => {
              onClick();
              logout();
            }
            : null}
        >
          {auth ? 'Cerrar sesión' : 'Iniciar sesión'}
        </NavLink>
      </li>
    </>
  );
};

const Menu = ({
  navLinks, auth, logout, onClick,
}) => {
  const buttonBackground = (isActive) => {
    if (auth) return '';
    return (isActive) && 'bg-background';
  };

  return (
    <>
      {
        navLinks
          .filter(auth ? () => true : (link) => !link.needsAuth)
          .map((link) => (
            <li className="size-full" key={link.alt}>
              <NavLink
                className={({ isActive }) => (`${isActive && 'bg-background'} flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg`)}
                to={link.route}
                onClick={() => onClick()}
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

      <li className="size-full">
        <NavLink
          className={({ isActive }) => (`${buttonBackground(isActive)} flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg`)}
          to={auth ? '/' : '/iniciar-sesion'}
          end
          onClick={
            auth
              ? () => {
                onClick();
                logout();
              }
              : () => onClick()
          }
        >
          <img
            src={auth ? logoutIcon : loginIcon}
            alt={auth ? 'logout' : 'login'}
            className="size-[35px]"
          />
          <span className="text-xs text-slate-500">
            {auth ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </span>
        </NavLink>
      </li>
    </>
  );
};

const Navbar = () => {
  const { auth, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      title: 'Mapa',
      route: '/',
      src: mapIcon,
      alt: 'map',
      needsAuth: false,
    },
    {
      title: 'Información',
      route: '/informacion',
      src: infoIcon,
      alt: 'info',
      needsAuth: false,
    },
    {
      title: 'FAQ',
      route: '/faq',
      src: helpIcon,
      alt: 'help',
      needsAuth: false,
    },
    {
      title: 'Espacios',
      route: '/espacios',
      src: workspacesIcon,
      alt: 'workspaces',
      needsAuth: true,
    },
    {
      title: 'Cuenta',
      route: '/cuenta',
      src: accountIcon,
      alt: 'accountIcon',
      needsAuth: true,
    },
  ];

  return (
    <>
      { isMenuOpen && <div className="h-[105px] p-5" /> }

      <div className={`${isMenuOpen && 'absolute'} w-full bg-transparent p-5`}>
        <nav className={`relative z-50 flex w-full flex-col items-center justify-between space-y-5 divide-y rounded-lg bg-white p-5 shadow 
                        sm:flex-row sm:space-y-0 sm:divide-y-0`}
        >
          <div className="flex w-full justify-between sm:w-fit">
            <Link
              className="text-lg font-bold leading-tight tracking-tight text-black"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              smca
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden"
            >
              <img
                src={isMenuOpen ? close : menu}
                alt="drop down menu button"
                className="size-[25px]"
              />
            </button>
          </div>

          <ul className="hidden w-fit flex-row items-center gap-10 sm:flex">
            <Bar
              navLinks={navLinks}
              auth={auth}
              logout={logout}
              onClick={() => setIsMenuOpen(false)}
            />
          </ul>

          <ul className={`${isMenuOpen ? 'grid' : 'hidden'} ${auth ? 'grid-cols-3' : 'grid-cols-2'} h-[201px] w-full grid-rows-2 justify-items-center gap-5 pt-5 sm:hidden`}>
            <Menu
              navLinks={navLinks}
              auth={auth}
              logout={logout}
              onClick={() => setIsMenuOpen(false)}
            />
          </ul>
        </nav>
      </div>

      { isMenuOpen && <BackdropFilter index="z-30" /> }
    </>
  );
};

export default Navbar;
