import { React, useState, useEffect } from 'react';

import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { Outlet, useNavigate } from 'react-router-dom';

import { Navbar } from 'src/components/bars';
import notificationHelper from 'src/utils/notificationHelper';

import useAuth from '../hooks/useAuth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

const Root = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    const authData = response.data;

    notificationHelper.info('Bienvenid@!');

    setAuth(authData);
  };

  const logout = async (type) => {
    await axios.post('/api/auth/logout');
    setAuth(null);

    switch (type) {
      case 'onStart':
        break;
      case 'onExpiredSession':
        notificationHelper.errorMsg('La sesión ha expirado.');
        break;
      default:
        notificationHelper.info('Hasta luego!');
        navigate('/');
    }
  };

  const refreshAccessToken = async (onStart) => {
    try {
      const response = await axiosInstance.get('/api/auth/refresh-access-token', { withCredentials: true });

      setAuth(response.data);
      return { success: true, newAccesToken: response.data.accessToken };
    } catch (error) {
      const errorMessage = error.response.data.message;

      if (errorMessage === 'La sesión ha expirado.') {
        logout(onStart ? 'onStart' : 'onExpiredSession');
      }

      return { success: false, error };
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
        let finalError = error;

        const prevRequest = error?.config;

        if (error?.response?.status === 403 && error.response.data.message === 'TokenExpiredError' && !prevRequest?.sent) {
          prevRequest.sent = true;

          const refreshResponse = await refreshAccessToken();

          if (refreshResponse.success) {
            prevRequest.headers.Authorization = `Bearer ${refreshResponse.newAccessToken}`;
            return axiosInstance(prevRequest);
          }

          finalError = refreshResponse.error;
        }

        return Promise.reject(finalError);
      },
    );
  }, [auth]);

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const checkIfLogged = async () => {
      await refreshAccessToken(true);
    };

    if (!auth)
      checkIfLogged();

    setLoadingUser(false);
  }, []);

  const errorHandler = (error, revalidator) => {
    const errorMessage = error.response.data.message;
    notificationHelper.errorMsg(errorMessage);

    if (errorMessage === 'La sesión ha expirado.') {
      navigate('/iniciar-sesion');
    }
    if (errorMessage === 'El espacio indicado no se encuentra registrado.') {
      navigate('/espacios');
    }
    if (errorMessage === 'No tienes los permisos necesarios para realizar esta acción.') {
      revalidator();
      return '..';
    }
    if (errorMessage === 'La cuenta no forma parte del espacio.') {
      revalidator();
      return '..';
    }
    if (errorMessage === 'Acceso no autorizado.') {
      navigate('/espacios');
    }

    return null;
  };

  return ((loadingUser)
    ? (
      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background">
        <Oval
          visible
          height="80"
          width="80"
          color="#0369a1"
          secondaryColor="#0284c7"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
    : (
      <div className="relative flex h-screen w-full flex-col justify-between bg-background">
        <Navbar logout={logout} />
        <Outlet context={{ login, errorHandler }} />
      </div>
    )
  );
};

export default Root;
