import { React } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  {
    route: '/cuenta/nodos',
    title: 'Nodos',
  },
  {
    route: '/cuenta/ubicaciones',
    title: 'Ubicaciones',
  },
  {
    route: '/cuenta/componentes',
    title: 'Componentes',
  },
  {
    route: '/cuenta/variable',
    title: 'Variables',
  },
  {
    route: '/cuenta/usuario',
    title: 'Usuario',
  },
];

const AccountBar = ({ user, setUser }) =>
  (
    <nav className="flex w-full items-center justify-between p-5 bg-white rounded-lg shadow">
      <div className="font-medium leading-tight tracking-tight text-gray-900">
        {`Bienvenido, ${user.first_name} ${user.last_name}`}
      </div>

      {/* On desktop */}
      <div className="flex flex-1 items-center justify-end">
        {
          navLinks.map((nav) =>
            (
              <Link
                key={`desktop ${nav.title}`}
                className="mr-10 cursor-pointer font-medium leading-tight tracking-tight text-primary-600 no-underline hover:underline"
                to={nav.route}
              >
                {nav.title}
              </Link>
            ))
        }
        <button
          type="button"
          className="mr-0 cursor-pointer text-base font-medium leading-tight tracking-tight text-primary-600 no-underline hover:underline"
          onClick={() =>
            setUser(null)}
        >
          Cerrar sesion
        </button>
      </div>

    </nav>
  );

export default AccountBar;
