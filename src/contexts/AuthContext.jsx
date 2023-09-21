import {
  React, useState, useMemo, createContext, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import userAccountService from 'src/services/userAccounts';
import notifications from 'src/utils/notifications';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const value = JSON.parse(window.localStorage.getItem('loggedSmcaUser'));
      if (value) {
        return value;
      }
      return null;
    } catch (err) {
      return null;
    }
  });

  const navigate = useNavigate();

  const userLogin = async (data) => {
    try {
      const userInfo = await userAccountService.login(data);
      setUser(userInfo);
      notifications.info(`Bienvenid@, ${userInfo.firstName} ${userInfo.lastName}`);
      navigate('/');
    } catch (exception) {
      notifications.error(exception);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedSmcaUser');
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      userLogin,
      logout,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default {
  AuthProvider,
  useAuth,
};
