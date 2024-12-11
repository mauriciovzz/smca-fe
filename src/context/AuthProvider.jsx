import {
  React, createContext, useState, useMemo,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={useMemo(() => ({ auth, setAuth }), [auth])}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
};
