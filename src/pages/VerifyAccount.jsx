import { React, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { VerificationSuccess, VerificationError } from 'src/layout';
import accountService from 'src/services/accounts';

const VerifyAccount = () => {
  const { verificationToken } = useParams();
  const [requestMade, setRequestMade] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const checkToken = async () => {
    try {
      const response = await accountService.verifyAccount({ verificationToken });
      setMessage(response);
      setWasSuccessful(!wasSuccessful);
      setRequestMade(!requestMade);
    } catch (err) {
      setMessage(err.response.data.error);
      setRequestMade(!requestMade);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    requestMade && (
      wasSuccessful
        ? (
          <VerificationSuccess text="Verificar Cuenta" message={message} />
        )
        : (
          <VerificationError text="Verificar Cuenta" message={message} />
        )
    )
  );
};

export default VerifyAccount;
