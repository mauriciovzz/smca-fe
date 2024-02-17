import { React, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { mail } from 'src/assets';

const EmailSend = ({ type, email, message }) => {
  const [expiration, setExpiration] = useState('');

  useEffect(() => {
    switch (type) {
      case 'account':
        setExpiration('1 hora');
        break;
      case 'password':
        setExpiration('10 minutos');
        break;
      default:
        setExpiration('');
    }
  }, []);

  return (
    <div className="flex h-fit w-full flex-col space-y-5 divide-y rounded-lg bg-white p-5 shadow sm:w-96">
      <div className="flex h-fit w-full flex-col space-y-5">
        <img
          src={mail}
          alt="mail"
          className="h-[60px] w-[60px] self-center"
        />

        <p className="text-justify">
          {`${message} al correo electrónico:`}
        </p>

        <b className="self-center text-lg">
          {email}
        </b>

        <p className="w-full text-center text-sm font-light text-gray-500">
          {`Este enlace de verificación expirará en ${expiration}.`}
        </p>
      </div>

      {
        (type === 'account') && (
          <p className="pt-5 text-justify">
            Si tu enlace ha expirado,&nbsp;
            <Link
              to="/iniciar-sesion"
              className="font-medium text-main hover:underline"
            >
              inicia sesión
            </Link>
            &nbsp;en la aplicación para solicitar uno nuevo.
          </p>
        )
      }

    </div>
  );
};

export default EmailSend;
