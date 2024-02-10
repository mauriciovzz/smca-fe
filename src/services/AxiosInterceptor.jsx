import { useContext } from 'react';

import axios from 'axios';

import { AuthContext, api } from 'src/context/authProvider';

const AxiosInterceptor = ({ children }) => {
  const { checkLocalStorage, updateAccessToken, logout } = useContext(AuthContext);

  axios.interceptors.request.use(
    (config) => {
      const auth = checkLocalStorage();
      if (auth && auth?.accessToken) config.headers.Authorization = `Bearer ${auth.accessToken}`;
      return config;
    },
    (err) => Promise.reject(err),
  );

  axios.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalRequest = err.config;

      if (err.response.status === 403 && err.response.data.error === 'TokenExpiredError' && !originalRequest.retry) {
        originalRequest.retry = true;

        try {
          const accessToken = await updateAccessToken();
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (newErr) {
          logout(newErr);
        }
      }

      return Promise.reject(err);
    },
  );

  return children;
};

export default AxiosInterceptor;
