import axios from 'axios';

const baseUrl = '/api/accounts';

const create = async (accountInfo) => {
  const response = await axios.post(baseUrl, accountInfo);
  return response.data;
};

const verify = async (accountId, verificationToken) => {
  const response = await axios.post(`${baseUrl}/verify/${accountId}/${verificationToken}`);
  return response.data;
};

const resendVerificationLink = async (email) => {
  const response = await axios.post(`${baseUrl}/resend-account-verification-email`, email);
  return response.data;
};

const get = async (accountId) => {
  const response = await axios.get(`${baseUrl}/${accountId}`);
  return response.data;
};

const updateName = async (accountId, newName) => {
  const response = await axios.put(`${baseUrl}/${accountId}/update-name`, newName);
  return response.data;
};

const updatePassword = async (accountId, newPassword) => {
  const response = await axios.put(`${baseUrl}/${accountId}/update-password`, newPassword);
  return response.data;
};

const updateEmail = async (accountId, newEmail) => {
  const response = await axios.post(`${baseUrl}/${accountId}/update-email`, newEmail);
  return response.data;
};

const verifyNewEmail = async (accountId, verificationToken) => {
  const response = await axios.post(`${baseUrl}/verify-new-email/${accountId}/${verificationToken}`);
  return response.data;
};

const remove = async (accountId, accountData) => {
  const response = await axios.delete(`${baseUrl}/${accountId}`, { data: accountData });
  return response.data;
};

const recoverPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/recover-password`, email);
  return response.data;
};

const resetPassword = async (accountId, verificationToken, newPassword) => {
  const response = await axios.post(`${baseUrl}/reset-password/${accountId}/${verificationToken}`, newPassword);
  return response.data;
};

export default {
  create,
  verify,
  resendVerificationLink,
  get,
  updateName,
  updateEmail,
  updatePassword,
  verifyNewEmail,
  remove,
  recoverPassword,
  resetPassword,
};
