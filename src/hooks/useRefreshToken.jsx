import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(
      '/api/auth/refresh-access-token',
      { withCredentials: true },
    );

    setAuth(response.data);

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
