import axios from 'axios';

const baseUrl = '/api/invitations';

const invite = async (spaceId, email) => {
  const response = await axios.post(`${baseUrl}/${spaceId}`, email);
  return response.data;
};

const getInvitations = async (accountId) => {
  const response = await axios.get(`${baseUrl}/${accountId}`);
  return response.data;
};

const invitationResponse = async (spaceId, accountId, invResponse) => {
  const response = await axios.post(`${baseUrl}/${spaceId}/response/${accountId}`, invResponse);
  return response.data;
};

export default {
  invite,
  getInvitations,
  invitationResponse,
};
