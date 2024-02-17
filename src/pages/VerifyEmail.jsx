import { React, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { VerificationSuccess, VerificationError } from 'src/layout';
import accountService from 'src/services/accounts';

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const [requestMade, setRequestMade] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(undefined);
  const [message, setMessage] = useState('');

  const checkToken = async () => {
    try {
      const response = await accountService.verifyEmail({ verificationToken });
      setWasSuccessful(true);
      setMessage(response);
      setRequestMade(true);
    } catch (err) {
      setMessage(err.response.data.error);
      setRequestMade(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    requestMade && (
      wasSuccessful
        ? (
          <VerificationSuccess text="Verificar Correo" message={message} />
        )
        : (
          <VerificationError text="Verificar Correo" message={message} />
        )
    )
  );
};

export default VerifyEmail;
