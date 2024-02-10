import axios from 'axios';

const baseUrl = '/api/accounts';

const register = async (accountInfo) => {
  const response = await axios.post(`${baseUrl}/register`, accountInfo);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/forgotPassword`, email);
  return response.data;
};

const resetPassword = async (accountId, resetToken, newPassword) => {
  const response = await axios.post(`${baseUrl}/resetPassword/${accountId}/${resetToken}`, { newPassword });
  return response.data;
};

const updateName = async (newName) => {
  const response = await axios.put(`${baseUrl}/updateName`, newName);
  return response.data;
};

const updateEmail = async (newEmail) => {
  const response = await axios.post(`${baseUrl}/updateEmail`, newEmail);
  return response.data;
};

const confirmEmail = async (verificationToken) => {
  const response = await axios.post(`${baseUrl}/confirmEmail`, verificationToken);
  return response.data;
};

const updatePassword = async (newPassword) => {
  const response = await axios.put(`${baseUrl}/updatePassword`, newPassword);
  return response.data;
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateName,
  updateEmail,
  confirmEmail,
  updatePassword,
};
