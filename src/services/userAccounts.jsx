import axios from 'axios';

const baseUrl = '/api/user_accounts';

const register = async (userInfo) => {
  const response = await axios.post(baseUrl, userInfo);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  window.localStorage.setItem('loggedSmcaUser', JSON.stringify(response.data));
  return response.data;
};

const logout = () => {
  window.localStorage.removeItem('loggedSmcaUser');
};

const getCurrentUser = () => JSON.parse(window.localStorage.getItem('loggedSmcaUser'));

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
