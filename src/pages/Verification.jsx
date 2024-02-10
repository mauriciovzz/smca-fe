import { React, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { errorIcon, successIcon } from 'src/assets';
import { BackdropFilter, Heading, Map } from 'src/components';
import accountService from 'src/services/accounts';

const Verification = () => {
  const { verificationToken } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [wasSuccesfull, setWasSuccesfull] = useState(undefined);
  const [message, setMessage] = useState('');

  const checkToken = async () => {
    try {
      const response = await accountService.confirmEmail({ verificationToken });
      setWasSuccesfull(true);
      setMessage(response);
      setIsLoaded(true);
    } catch (err) {
      setWasSuccesfull(false);
      setMessage(err.response.data.error);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          isLoaded && (
            <div className="h-fit w-full divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
              <Heading text="Actualizacion de Correo Electrónico " />

              <div className="space-y-5 pt-5">
                {
                  wasSuccesfull
                    ? (
                      <div className="flex space-x-5">
                        <img
                          src={successIcon}
                          alt="success"
                          className="h-[60px] w-[60px] self-center"
                        />
                        <div className="self-center text-lg sm:text-lg">
                          {message}
                        </div>
                      </div>
                    )
                    : (
                      <div className="space-y-5">
                        <div className="flex h-fit space-x-5">
                          <img
                            src={errorIcon}
                            alt="error"
                            className="h-[60px] w-[60px]"
                          />
                          <div className="self-center text-lg sm:text-lg">
                            Su correo electrónico no fue actualizado.
                          </div>
                        </div>
                        <div className="text-center font-bold">
                          {message}
                        </div>
                      </div>
                    )
                }
              </div>
            </div>
          )
        }

      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default Verification;
