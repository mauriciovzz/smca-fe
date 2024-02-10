import { React, useState, useContext } from 'react';

import { Link, NavLink } from 'react-router-dom';

import {
  accountIcon, close, groups, help, info, loginIcon, logoutIcon, map, menu,
} from 'src/assets';
import { BackdropFilter } from 'src/components';
import { AuthContext } from 'src/context/authProvider';

const navLinks = [
  {
    title: 'Mapa',
    route: '/',
    src: map,
    alt: 'map',
    needsAuth: false,
  },
  {
    title: 'Información',
    route: '/informacion',
    src: info,
    alt: 'info',
    needsAuth: false,
  },
  {
    title: 'FAQ',
    route: '/faq',
    src: help,
    alt: 'help',
    needsAuth: false,
  },

  {
    title: 'Espacios',
    route: '/espacios-de-trabajo',
    src: groups,
    alt: 'groups',
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

const NavBar = ({ auth, logout, onClick }) => (
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
        className={({ isActive }) => (`${isActive ? 'bg-main-dark' : 'bg-main hover:bg-main-dark'} rounded-lg p-2 font-medium text-white`)}
        to={auth ? '/cerrar-sesion' : '/iniciar-sesion'}
        onClick={
          auth
            ? () => {
              logout();
              onClick();
            }
            : () => onClick()
        }
      >
        {auth ? 'Cerrar sesión' : 'Iniciar sesión'}
      </NavLink>
    </li>
  </>
);

const NavMenu = ({ auth, logout, onClick }) => (
  <>
    {
      navLinks
        .filter(auth ? () => true : (link) => !link.needsAuth)
        .map((link) => (
          <li className="h-full w-full" key={link.alt}>
            <NavLink
              className={({ isActive }) => (`${isActive && 'bg-background'} flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg`)}
              to={link.route}
              onClick={() => onClick()}
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

    <li className="h-full w-full">
      <NavLink
        className={({ isActive }) => (`${isActive && 'bg-background'} flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg`)}
        to={auth ? '/cerrar-sesion' : '/iniciar-sesion'}
        end
        onClick={
          auth
            ? () => {
              logout();
              onClick();
            }
            : () => onClick()
        }
      >
        <img
          src={auth ? logoutIcon : loginIcon}
          alt={auth ? 'logout' : 'login'}
          className="h-[35px] w-[35px]"
        />
        <span className="text-xs text-slate-500">
          {auth ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </span>
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      { isMenuOpen && <div className="h-[105px]" /> }

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
                className="h-[25px] w-[25px]"
              />
            </button>
          </div>

          <ul className="hidden w-fit flex-row items-center gap-10 sm:flex">
            <NavBar
              auth={auth}
              logout={logout}
              onClick={() => setIsMenuOpen(false)}
            />
          </ul>

          <ul className={`${isMenuOpen ? 'grid' : 'hidden'} ${auth ? 'grid-cols-3' : 'grid-cols-2'} h-[201px] w-full grid-rows-2 justify-items-center gap-5 pt-5 sm:hidden`}>
            <NavMenu
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
