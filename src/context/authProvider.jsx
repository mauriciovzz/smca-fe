import {
  React, createContext, useState, useEffect,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import notifications from 'src/utils/notifications';

const AuthContext = createContext();

const api = axios.create({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const checkLocalStorage = () => JSON.parse(window.localStorage.getItem('loggedSmcaUser'));

  useEffect(() => {
    setAuth(checkLocalStorage());
  }, []);

  const saveInLocalStorage = (accountInfo) => window.localStorage.setItem('loggedSmcaUser', JSON.stringify(accountInfo));

  const login = (accountInfo) => {
    notifications.info(`Bienvenid@, ${accountInfo.firstName} ${accountInfo.lastName}`);
    saveInLocalStorage(accountInfo);
    setAuth(accountInfo);
    navigate('/');
  };

  const logout = (err) => {
    if (err) {
      notifications.error(err);
    } else {
      notifications.info(`Hasta luego, ${auth.firstName} ${auth.lastName}`);
    }

    window.localStorage.removeItem('loggedSmcaUser');
    setAuth(null);
    navigate('/');
  };

  const updateAccessToken = async () => {
    const localData = checkLocalStorage();
    const { refreshToken } = localData;

    const response = await api.post('/api/accounts/refreshAccessToken', { refreshToken });
    const accountInfo = response.data;

    saveInLocalStorage(accountInfo);
    setAuth(accountInfo);
    return accountInfo.accessToken;
  };

  return (
    <AuthContext.Provider value={{
      auth, setAuth, login, logout, checkLocalStorage, updateAccessToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, api };
