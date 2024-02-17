import axios from 'axios';

const baseUrl = '/api/accounts';

const register = async (accountInfo) => {
  const response = await axios.post(`${baseUrl}/register`, accountInfo);
  return response.data;
};

const resendVerificationLink = async (email) => {
  const response = await axios.post(`${baseUrl}/resendVerificationLink`, email);
  return response.data;
};

const verifyAccount = async (verificationToken) => {
  const response = await axios.post(`${baseUrl}/verifyAccount`, verificationToken);
  return response.data;
};

const recoverPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/recoverPassword`, email);
  return response.data;
};

const resetPassword = async (resetData) => {
  const response = await axios.post(`${baseUrl}/resetPassword`, resetData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
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

const verifyEmail = async (verificationToken) => {
  const response = await axios.post(`${baseUrl}/verifyEmail`, verificationToken);
  return response.data;
};

const updatePassword = async (newPassword) => {
  const response = await axios.put(`${baseUrl}/updatePassword`, newPassword);
  return response.data;
};

export default {
  register,
  resendVerificationLink,
  verifyAccount,
  recoverPassword,
  resetPassword,
  login,
  updateName,
  updateEmail,
  verifyEmail,
  updatePassword,
};
