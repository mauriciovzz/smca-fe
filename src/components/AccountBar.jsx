import { React, useState } from 'react';
import x from '../assets/x.svg';
import list from '../assets/list.svg';

const navLinks = [
  'Nodos',
  'Ubicaciones',
  'Componentes',
  'Variables',
  'Cuenta',
];

const AccountBar = ({ user, setUser }) => {
  const [selected, setSelected] = useState('nodos');

  return (
    <nav className="flex w-full items-center justify-between py-5 px-5  w-full bg-white rounded-lg shadow">
      <div className="font-medium leading-tight tracking-tight text-gray-900">
        {`Bienvenido, ${user.first_name} ${user.last_name}`}
      </div>

      {/* On desktop */}
      <div className="flex flex-1 items-center justify-end">
        {
          navLinks.map((name) =>
            (
              <button
                key={`desktop ${name}`}
                type="button"
                className="mr-10 cursor-pointer font-medium leading-tight tracking-tight text-primary-600 no-underline hover:underline"
                onClick={() =>
                  setSelected(name)}
              >
                {name}
              </button>
            ))
        }
        {
          <button
            type="button"
            className="mr-0 cursor-pointer text-base font-medium leading-tight tracking-tight text-primary-600 no-underline hover:underline"
            onClick={() =>
              setUser(null)}
          >
            cerrar sesion
          </button>
        }
      </div>

    </nav>
  );
};

export default AccountBar;
