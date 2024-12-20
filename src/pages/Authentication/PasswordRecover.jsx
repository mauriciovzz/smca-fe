import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'src/api/axios';
import { Button, TextInput } from 'src/components/inputs';
import { BackgroundMap } from 'src/components/maps';
import { EmailSent } from 'src/components/messages';
import { Divider, Heading, LoaderSpinner } from 'src/components/ui';
import notificationHelper from 'src/utils/notificationHelper';

const PasswordRecover = () => {
  const navigate = useNavigate();

  const [requestMade, setRequestMade] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [requestResponse, setRequestResponse] = useState({});

  const [email, setEmail] = useState('');

  const handlePasswordRecoverSubmit = async (event) => {
    event.preventDefault();

    setWaitingForResponse(true);
    setRequestMade(true);

    try {
      const response = await axios.post(
        '/api/accounts/recover-password',
        { email },
      );

      setRequestResponse(response.data);
    } catch (error) {
      setRequestMade(false);

      if (error.response.data.message === 'Su cuenta no se encuentra verificada.') {
        navigate('/reenviar-enlace-verificacion/', { state: { email } });
      } else {
        notificationHelper.error(error.response.data.message);
      }
    } finally {
      setWaitingForResponse(false);
    }
  };

  const renderView = () => {
    if (!requestMade)
      return (
        <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:size-fit">
          <Heading text="Recuperar Contraseña" />

          <Divider />

          <form id="form" onSubmit={handlePasswordRecoverSubmit} className="space-y-5">
            <p className="text-justify text-sm font-light">
              {'Ingrese el correo electrónico de su cuenta y le enviaremos '}
              <br className="hidden sm:flex" />
              {'un correo que le permitirá restablecer su contraseña. '}
            </p>

            <TextInput
              id="email"
              type="email"
              labelText="Correo Electrónico"
              value={email}
              setValue={setEmail}
              autoComplete="email"
            />

            <Button
              text="Recuperar Contraseña"
              form="form"
              color="blue"
            />
          </form>
        </div>
      );

    if (waitingForResponse)
      return <LoaderSpinner />;

    return <EmailSent requestResponse={requestResponse} />;
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {renderView()}
      </div>

      <BackgroundMap />
    </>
  );
};

export default PasswordRecover;
