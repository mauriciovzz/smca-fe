import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';
import axios from '../api/axios';
import notificationHelper from '../utils/notificationHelper';

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async (byRefreshToken) => {
    setAuth({});

    await axios.post(
      '/api/auth/logout',
      { withCredentials: true },
    );

    if (!byRefreshToken) {
      notificationHelper.info('Hasta luego!');
      navigate('/');
    }
  };

  return logout;
};

export default useLogout;
