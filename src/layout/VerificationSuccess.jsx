import { React, useContext } from 'react';

import { Link } from 'react-router-dom';

import { successIcon } from 'src/assets';
import { Divider, Heading } from 'src/components';
import { AuthContext } from 'src/context/authProvider';

const VerificationSuccess = ({ text, message }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex h-fit w-full flex-col items-center rounded-lg bg-white p-5 shadow sm:h-fit sm:w-96">
      <Heading text={text} />

      <Divider />

      <div className="flex w-full flex-col items-center gap-5">
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
          <>
            <Divider />

            <p className="w-full text-center font-light text-gray-500">
              <Link
                to="/iniciar-sesion"
                className="font-medium text-main hover:underline"
              >
                Inicia sesión
              </Link>
              &nbsp;con tu cuenta.
            </p>
          </>

        )
      }
    </div>
  );
};

export default VerificationSuccess;
