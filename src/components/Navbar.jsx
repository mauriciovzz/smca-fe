import { React, useState } from 'react';
import x from '../assets/x.svg';
import list from '../assets/list.svg';

const navLinks = [
  {
    id: 'mapa',
    title: 'Mapa',
  },
  {
    id: 'reportes',
    title: 'Reportes',
  },
  {
    id: 'informacion',
    title: 'Informacion',
  },
  {
    id: 'faq',
    title: 'FAQ',
  },
  {
    id: 'log',
    title: 'Log In',
  },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between py-6">
      <h1>LOGO</h1>

      {/* On desktop */}
      <ul className="hidden flex-1 list-none items-center justify-end sm:flex">
        {navLinks.map((nav, index) =>
          (
            <li
              key={nav.id}
              className={`${
                index === navLinks.length - 1
                  ? 'font normal p- mr-0 cursor-pointer rounded-full bg-bluey px-6 text-[16px] text-white'
                  : 'mr-10 cursor-pointer font-poppins text-[16px] font-normal text-bluey'
              }`}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
      </ul>

      {/* On mobile */}
      <div className="flex flex-1 items-center justify-end sm:hidden">
        <img
          src={toggle ? x : list}
          alt="list"
          className="h-[28px] w-[28px] object-contain"
          onClick={() =>
            setToggle((prev) =>
              !prev)}
        />

        <div
          className={`${
            toggle ? 'flex' : 'hidden'
          } absolute right-0 top-20 mx-4 my-2 min-w-[140px] bg-primary p-6`}
        >
          <ul className="flex flex-1 list-none flex-col items-center justify-end">
            {navLinks.map((nav, index) =>
              (
                <li
                  key={nav.id}
                  className={`cursor-pointer font-poppins text-[16px] font-normal ${
                    index === navLinks.length - 1 ? 'mr-0' : 'mb-4'
                  } text-sky-600`}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
