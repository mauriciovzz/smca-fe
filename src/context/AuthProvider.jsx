import {
  React, createContext, useState, useEffect, useMemo,
} from 'react';

import axios from 'axios';
import { redirect } from 'react-router-dom';

import notifications from 'src/utils/notifications';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    const authData = response.data;

    notifications.info('Bienvenid@!');

    setAuth(authData);
  };

  const logout = async (sessionExpired) => {
    await axios.post('/api/auth/logout');
    setAuth(null);

    if (sessionExpired) {
      redirect('/iniciar-sesion');
      notifications.errorMsg('Su sesión ha expirado.');
    } else {
      redirect('/');
      notifications.info('Hasta luego!');
    }
  };

  const refreshAccessToken = async (onStart) => {
    try {
      const response = await axiosInstance.get('/api/auth/refresh-access-token', { withCredentials: true });

      setAuth(response.data);
      return response.data.accessToken;
    } catch (error) {
      const errorMessage = error.response.data.message;

      if (!onStart && errorMessage === 'La sesión ha expirado.') logout(true);
      return null;
    }
  };

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && error.response.data.message === 'TokenExpiredError' && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refreshAccessToken();

          if (newAccessToken) {
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          }
        }

        return Promise.reject(error);
      },
    );
  }, [auth]);

  useEffect(() => {
    const checkIfLogged = async () => {
      await refreshAccessToken(true);
    };

    if (!auth) checkIfLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({
        auth, login, logout, refreshAccessToken,
      }), [auth])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
};
