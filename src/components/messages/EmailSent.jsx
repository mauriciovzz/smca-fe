import { React } from 'react';

import { Link } from 'react-router-dom';

import { mailIcon } from 'src/assets';

const EmailSent = ({ requestResponse }) => (
  <div className="flex h-fit w-full flex-col space-y-2.5 divide-y rounded-lg bg-white p-5 shadow sm:w-96">
    <div className="flex h-fit w-full flex-col space-y-2.5">
      <img
        src={mailIcon}
        alt="mail"
        className="size-[60px] self-center"
      />

      <p className="w-full text-center font-light">
        {requestResponse.message}
      </p>

      <b className="w-full text-center">
        {requestResponse.email}
      </b>

      <p className="w-full text-center font-light">
        {requestResponse.linkExpiration}
      </p>
    </div>

    {
        (requestResponse.linkType === 'emailVerification') && (
          <p className="pt-2.5 text-justify text-sm font-light">
            Si tu enlace ha expirado,&nbsp;
            <Link to="/iniciar-sesion" className="font-medium text-main hover:underline">
              inicia sesión
            </Link>
            &nbsp;en la aplicación para solicitar uno nuevo.
          </p>
        )
      }
  </div>
);

export default EmailSent;
