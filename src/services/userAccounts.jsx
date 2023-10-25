import axios from 'axios';

const baseUrl = '/api/user_accounts';

const register = async (userInfo) => {
  const response = await axios.post(baseUrl, userInfo);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export default {
  register,
  login,
};
