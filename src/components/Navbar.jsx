import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import close from 'src/assets/close.svg';
import menu from 'src/assets/menu.svg';

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
    <div className="z-50 flex items-center justify-center px-6 shadow sm:px-16">
      <div className="w-full xl:max-w-[1280px]">

        <nav className="flex w-full items-center justify-between py-6">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900">
            smca
          </h1>

          {/* On desktop */}
          <div className="hidden flex-1 items-center justify-end sm:flex">
            {
              navLinks.map((link) => (
                <Link
                  key={`${link.title}`}
                  className="mr-10 cursor-pointer text-base font-medium leading-tight tracking-tight text-primary-600 no-underline hover:underline"
                  to={link.route}
                >
                  {link.title}
                </Link>
              ))
            }
            {
              user
                ? (
                  <Link
                    className="mr-0 cursor-pointer rounded-full bg-primary-600 px-6 py-0.5 text-base font-medium leading-tight tracking-tight text-white hover:bg-primary-700"
                    to="/cuenta"
                  >
                    Cuenta
                  </Link>
                )
                : (
                  <Link
                    className="mr-0 cursor-pointer rounded-full bg-primary-600 px-6 py-0.5 text-base font-medium leading-tight tracking-tight text-white hover:bg-primary-700"
                    to="/login"
                  >
                    Log in
                  </Link>
                )
            }
          </div>

          {/* On mobile */}
          <div className="flex flex-1 items-center justify-end sm:hidden">
            <button type="button" onClick={() => setToggle((prev) => !prev)}>
              <img
                src={toggle ? close : menu}
                alt="drop down menu"
                className="h-[28px] w-[28px] object-contain"
              />
            </button>

            <div
              className={`${toggle ? 'flex' : 'hidden'} absolute right-0 top-20 mx-4 my-2 min-w-[140px] rounded-lg bg-white p-6 shadow`}
            >
              <div className="flex flex-1 list-none flex-col items-center justify-end">
                {
                  navLinks.map((link) => (
                    <Link
                      key={`${link.title}`}
                      to={link.route}
                      className="mb-4 text-base font-medium leading-tight tracking-tight text-primary-600"
                      onClick={() => setToggle((prev) => !prev)}
                    >
                      {link.title}
                    </Link>
                  ))
                }
                {
                  user
                    ? (
                      <Link
                        to="/cuenta"
                        className="mr-0 rounded-full bg-primary-600 px-6 py-0.5 text-base font-medium leading-tight tracking-tight text-white"
                        onClick={() => setToggle((prev) => !prev)}
                      >
                        Cuenta
                      </Link>
                    )
                    : (
                      <Link
                        className="mr-0 rounded-full bg-primary-600 px-6 py-0.5 text-base font-medium leading-tight tracking-tight text-white"
                        to="/login"
                      >
                        Log in
                      </Link>
                    )
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
