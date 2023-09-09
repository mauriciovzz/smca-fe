import { React, useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ setUser }) => {
  const [open, setOpen] = useState(false);

  const navLinks = [

    {
      route: '/cuenta/nodos',
      title: 'Nodos',
      src: 'cloud',
      alt: 'cloud',
    },
    {
      title: 'Ubicaciones',
      route: '/cuenta/ubicaciones',
      src: 'location',
      alt: 'location marker',
    },
    {
      title: 'Componentes',
      route: '/cuenta/componentes',
      src: 'developer_board',
      alt: 'developer board',
    },
    {
      title: 'Variables',
      route: '/cuenta/variable',
      src: 'airwave',
      alt: 'airwave',
    },
    {
      title: 'Usuario',
      route: '/cuenta/usuario',
      src: 'account_circle',
      alt: 'account circle',
      gap: true,
    },
  ];

  return (
    <nav className="flex ">
      <div className={` ${open ? 'w-52' : 'w-20 '} h-full p-5 pt-8 relative bg-white rounded-lg shadow`}>

        <button
          type="button"
          onClick={() =>
            setOpen(!open)}
        >
          <img
            src="../../src/assets/control.svg"
            alt="control arrow"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-500 border-2 rounded-full  ${!open && 'rotate-180'}`}
          />
        </button>

        <div className="flex gap-x-4 items-center">
          <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>
            Bienvenido
          </h1>
        </div>

        <ul className="pt-6">
          {
            navLinks.map((link) =>
              (
                <Link
                  key={`desktop ${link.alt}`}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-100 text-gray-300 text-sm items-center gap-x-4 ${link.gap ? 'mt-9' : 'mt-2'}`}
                  to={link.route}
                >
                  <img
                    src={`../../src/assets/${link.src}.svg`}
                    alt={`${link.alt}`}
                  />
                  <span className={`${!open && 'hidden'} text-slate-500 origin-left duration-200`}>
                    {link.title}
                  </span>
                </Link>
              ))
          }
          <button
            type="button"
            className="flex rounded-md p-2 cursor-pointer hover:bg-slate-100 text-gray-300 text-sm items-center gap-x-4 mt-2"
            onClick={() =>
              setUser(null)}
          >
            <img
              src="../../src/assets/logout.svg"
              alt="logout"
            />
            <span className={`${!open && 'hidden'} text-slate-500 origin-left duration-200`}>
              Cerrar sesion
            </span>
          </button>
        </ul>

      </div>
    </nav>
  );
};

export default SideBar;
