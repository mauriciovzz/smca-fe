import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';

const navLinks = [
  {
    route: '/',
    title: 'Mapa',
  },
  {
    route: '/reportes',
    title: 'Reportes',
  },
  {
    route: '/informacion',
    title: 'Informacion',
  },
  {
    route: '/faq',
    title: 'FAQ',
  },
];

const Navbar = ({ user }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="z-50 flex items-center justify-center px-6 sm:px-16 shadow">
      <div className="w-full xl:max-w-[1280px]">
        <nav className="flex w-full items-center justify-between py-6">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900">
            smca
          </h1>
          {/* On desktop */}
          <div className="hidden flex-1 items-center justify-end sm:flex">
            {
              navLinks.map((nav) =>
                (
                  <Link
                    key={`desktop ${nav.title}`}
                    className="mr-10 cursor-pointer text-base font-medium leading-tight tracking-tight text-primary-600 no-underline hover:underline"
                    to={nav.route}
                  >
                    {nav.title}
                  </Link>
                ))
            }
            {
            user
              ? <Link key="desktop account" className="mr-0 cursor-pointer rounded-full bg-primary-600 px-6 py-0.5 text-white text-base font-medium leading-tight tracking-tight" to="/cuenta">Cuenta</Link>
              : <Link key="desktop account" className="mr-0 cursor-pointer rounded-full bg-primary-600 px-6 py-0.5 text-white text-base font-medium leading-tight tracking-tight" to="/login">Log in</Link>
            }
          </div>

          {/* On mobile */}
          <div className="flex flex-1 items-center justify-end sm:hidden">
            <img
              role="presentation"
              src={toggle ? close : menu}
              alt="list"
              className="h-[28px] w-[28px] object-contain"
              onClick={() =>
                setToggle((prev) =>
                  !prev)}
            />

            <div
              className={`${
                toggle ? 'flex' : 'hidden'
              } absolute right-0 top-20 mx-4 my-2 min-w-[140px] bg-white rounded-lg shadow p-6`}
            >
              <div className="flex flex-1 list-none flex-col items-center justify-end">
                {
                  navLinks.map((nav) =>
                    (
                      <Link
                        key={`mobile ${nav.title}`}
                        to={nav.route}
                        className="mb-4 cursor-pointer text-base font-medium leading-tight tracking-tight text-primary-600"
                        onClick={() =>
                          setToggle((prev) =>
                            !prev)}
                      >
                        {nav.title}
                      </Link>
                    ))
                }
                {
                user
                  ? <Link key="mobile account" className="mr-0 cursor-pointer rounded-full bg-primary-600 px-6 py-0.5 text-white text-base font-medium leading-tight tracking-tight" to="/cuenta">Cuenta</Link>
                  : <Link key="mobile account" className="mr-0 cursor-pointer rounded-full bg-primary-600 px-6 py-0.5 text-white text-base font-medium leading-tight tracking-tight" to="/login">Log in</Link>
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
