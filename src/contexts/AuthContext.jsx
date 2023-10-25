import {
  React, useState, useMemo, createContext, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

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

  const login = async (userInfo) => {
    window.localStorage.setItem('loggedSmcaUser', JSON.stringify(userInfo));
    setUser(userInfo);
    navigate('/');
  };

  const logout = () => {
    window.localStorage.removeItem('loggedSmcaUser');
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
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
