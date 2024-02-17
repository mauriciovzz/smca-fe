import { React, useContext } from 'react';

import { Link } from 'react-router-dom';

import { successIcon } from 'src/assets';
import { Heading } from 'src/components';
import { AuthContext } from 'src/context/authProvider';

const VerificationSuccess = ({ text, message }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex h-fit w-full flex-col items-center divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-96">
      <Heading text={text} />

      <div className={`${auth ? 'pt-5' : 'py-5'} flex w-full flex-col items-center space-y-5`}>
        <img
          src={successIcon}
          alt="success"
          className="h-[60px] w-[60px] self-center"
        />

        <div className="w-fit text-center text-lg">
          {message}
        </div>
      </div>

      {
        !auth && (
          <p className="w-full pt-5 text-center font-light text-gray-500">
            <Link
              to="/iniciar-sesion"
              className="font-medium text-main hover:underline"
            >
              Inicia sesión
            </Link>
            &nbsp;con tu cuenta.
          </p>
        )
      }
    </div>
  );
};

export default VerificationSuccess;
