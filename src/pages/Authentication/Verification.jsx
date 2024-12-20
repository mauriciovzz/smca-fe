import { React, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import axios from 'src/api/axios';
import { BackgroundMap } from 'src/components/maps';
import { VerificationSuccess, VerificationError } from 'src/components/messages';
import { LoaderSpinner } from 'src/components/ui';

const Verification = () => {
  const { verificationType, accountId, verificationToken } = useParams();

  const [loadingData, setLoadingData] = useState(true);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const accountVerification = async () => {
    try {
      const response = await axios.post(
        `/api/accounts/verify-account/${accountId}/${verificationToken}`,
      );

      setMessage(response.data);
      setWasSuccessful(true);
      setLoadingData(false);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoadingData(false);
    }
  };

  const newEmailVerification = async () => {
    try {
      const response = await axios.post(
        `/api/accounts/verify-new-email/${accountId}/${verificationToken}`,
      );

      setMessage(response.data);
      setWasSuccessful(true);
      setLoadingData(false);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    switch (verificationType) {
      case 'cuenta': {
        accountVerification();
        break;
      }
      case 'correo-electronico': {
        newEmailVerification();
        break;
      }
      default:
        setLoadingData(false);
        break;
    }
  }, []);

  const renderResponse = () => {
    switch (verificationType) {
      case 'cuenta': {
        if (wasSuccessful)
          return <VerificationSuccess headingText="Verificar Cuenta" message={message} showLoginLink />;

        return <VerificationError headingText="Verificar Cuenta" message={message} showLoginLink />;
      }
      case 'correo-electronico': {
        if (wasSuccessful)
          return <VerificationSuccess headingText="Verificar Correo" message={message} />;

        return <VerificationError headingText="Verificar Correo" message={message} />;
      }
      default:
        break;
    }

    return <VerificationError headingText="Verificar" message="Link invalido." />;
  };

  return loadingData
    ? <LoaderSpinner />
    : (
      <>
        <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
          {renderResponse()}
        </div>

        <BackgroundMap />
      </>
    );
};

export default Verification;
