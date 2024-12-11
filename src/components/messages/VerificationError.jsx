import { React } from 'react';

import { Link } from 'react-router-dom';

import { errorIcon } from 'src/assets';
import { Divider, Heading } from 'src/components/ui';

const VerificationError = ({ headingText, message, showLoginLink }) => (
  <div className="flex h-fit w-full flex-col items-center rounded-lg bg-white p-5 shadow sm:w-[400px]">
    <Heading text={headingText} />

    <Divider />

    <div className="flex w-full flex-col items-center space-y-5">
      <img
        src={errorIcon}
        alt="error"
        className="size-[60px] self-center"
      />

      <div className="text-center font-bold">
        {`Error: ${message}`}
      </div>
    </div>

    {
          (showLoginLink) && (
            <>
              <Divider />

              <p className="w-full text-center font-light text-gray-500">
                <Link
                  to="/iniciar-sesion"
                  className="font-medium text-main hover:underline"
                >
                  Inicia sesión
                </Link>
                &nbsp;con tu cuenta para solicitar un nuevo enlace de verificación.
              </p>
            </>

          )
        }
  </div>
);

export default VerificationError;
