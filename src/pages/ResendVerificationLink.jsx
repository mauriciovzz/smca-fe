import { React, useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { mail } from 'src/assets';
import { Button } from 'src/components';
import { EmailSend, VerificationSuccess, VerificationError } from 'src/layout';
import accountService from 'src/services/accounts';

const ResendVerificationLink = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [requestMade, setRequestMade] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/pagina-no-encontrada');
    }
    setEmail(state.email);
  }, []);

  const resendVerificationLink = async () => {
    try {
      const response = await accountService.resendVerificationLink({ email });
      setMessage(response);
      setWasSuccessful(!wasSuccessful);
      setRequestMade(!requestMade);
    } catch (err) {
      setMessage(err.response.data.error);
      setRequestMade(!requestMade);
    }
  };

  return (
    !requestMade
      ? (
        <div className="flex h-fit w-full flex-col space-y-5 rounded-lg bg-white p-5 shadow sm:w-96">
          <img
            src={mail}
            alt="mail"
            className="h-[60px] w-[60px] self-center"
          />

          <p className="text-center text-lg font-bold">
            Su cuenta no se encuentra verificada
          </p>

          <p className="text-justify">
            Para recibir un nuevo enlace de verificación en su correo&nbsp;
            <b>
              {email}
            </b>
            ,&nbsp;haga clic en el siguiente botón.
          </p>

          <Button
            text="Enviar Enlace"
            typeIsButton
            onClick={() => resendVerificationLink()}
            color="blue"
          />

          <p className="w-full text-center font-light text-gray-500">
            Este enlace de verificación expirará en 1 hora.
          </p>
        </div>
      )
      : (
        <div className="w-full sm:w-96">
          {
            wasSuccessful
              ? (
                <div className="w-full sm:w-96">
                  {
                    (message === 'Su cuenta ya se encuentra verificada.')
                      ? (
                        <VerificationSuccess text="Verificar Cuenta" message={message} />
                      )
                      : (
                        <EmailSend type="account" email={email} message={message} />
                      )
                  }
                </div>
              )
              : (
                <VerificationError text="Reenviar Vinculo" message={message} />
              )
          }
        </div>
      )
  );
};

export default ResendVerificationLink;
