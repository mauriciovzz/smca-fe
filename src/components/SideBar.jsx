import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import control from 'src/assets/control.svg';
import cloud from 'src/assets/cloud.svg';
import location from 'src/assets/location.svg';
import memory from 'src/assets/memory.svg';
import airwave from 'src/assets/airwave.svg';
import accountCircle from 'src/assets/account_circle.svg';
import logoutImage from 'src/assets/logout.svg';

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navLinks = [
    {
      route: '/cuenta/nodos',
      title: 'Nodos',
      src: cloud,
      alt: 'cloud',
    },
    {
      title: 'Ubicaciones',
      route: '/cuenta/ubicaciones',
      src: location,
      alt: 'location marker',
    },
    {
      title: 'Componentes',
      route: '/cuenta/componentes',
      src: memory,
      alt: 'memory',
    },
    {
      title: 'Variables',
      route: '/cuenta/variable',
      src: airwave,
      alt: 'airwave',
    },
    {
      title: 'Usuario',
      route: '/cuenta/usuario',
      src: accountCircle,
      alt: 'account circle',
      gap: true,
    },
  ];

  return (
    <nav className="flex ">

      <div className={`${open ? 'w-52' : 'w-20'} relative h-full rounded-lg bg-white p-5 pt-8 shadow`}>

        <button type="button" onClick={() => setOpen(!open)}>
          <img
            src={control}
            alt="control arrow"
            className={`absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 border-slate-500  ${!open && 'rotate-180'}`}
          />
        </button>

        <h1 className={`origin-left text-xl font-medium text-black duration-200 ${!open && 'scale-0'}`}>
          Bienvenido
        </h1>

        <ul className="pt-6">
          {
            navLinks.map((link) => (
              <Link
                key={`desktop ${link.alt}`}
                className={`flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-slate-100 ${link.gap ? 'mt-9' : 'mt-2'}`}
                to={link.route}
              >
                <img
                  src={link.src}
                  alt={`${link.alt}`}
                />
                <span className={`${!open && 'hidden'} origin-left text-slate-500 duration-200`}>
                  {link.title}
                </span>
              </Link>
            ))
          }

          <button
            type="button"
            className="mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-slate-100"
            onClick={() => {
              logout();
            }}
          >
            <img
              src={logoutImage}
              alt="logout"
            />
            <span className={`${!open && 'hidden'} origin-left text-slate-500 duration-200`}>
              Cerrar sesion
            </span>
          </button>
        </ul>

      </div>

    </nav>
  );
};

export default SideBar;
