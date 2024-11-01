import axios from 'axios';

const baseUrl = '/api/spaces';

const create = async (newSpaceData) => {
  const response = await axios.post(baseUrl, newSpaceData);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (spaceId) => {
  const response = await axios.get(`${baseUrl}/${spaceId}`);
  return response.data;
};

const updateName = async (spaceId, newName) => {
  const response = await axios.put(`${baseUrl}/${spaceId}/update-name`, newName);
  return response.data;
};

const updateColor = async (spaceId, newColor) => {
  const response = await axios.put(`${baseUrl}/${spaceId}/update-color`, newColor);
  return response.data;
};

const leave = async (spaceId, accountId) => {
  const response = await axios.delete(`${baseUrl}/${spaceId}/leave/${accountId}`);
  return response.data;
};

const remove = async (spaceId) => {
  const response = await axios.delete(`${baseUrl}/${spaceId}`);
  return response.data;
};

const invite = async (spaceId, email) => {
  const response = await axios.post(`${baseUrl}/${spaceId}/invite`, email);
  return response.data;
};

const getInvitations = async (accountId) => {
  const response = await axios.get(`${baseUrl}/invitations/${accountId}`);
  return response.data;
};

const invitationResponse = async (spaceId, invResponse) => {
  const response = await axios.post(`${baseUrl}/${spaceId}/invitation-response`, invResponse);
  return response.data;
};

const getMembers = async (spaceId) => {
  const response = await axios.get(`${baseUrl}/${spaceId}/members`);
  return response.data;
};

const updateMemberRole = async (spaceId, accountId) => {
  const response = await axios.put(`${baseUrl}/${spaceId}/update-role/${accountId}`);
  return response.data;
};

const removeMember = async (spaceId, accountId) => {
  const response = await axios.delete(`${baseUrl}/${spaceId}/remove-member/${accountId}`);
  return response.data;
};

export default {
  create,
  getAll,
  getOne,
  updateName,
  updateColor,
  leave,
  remove,
  invite,
  getInvitations,
  invitationResponse,
  getMembers,
  updateMemberRole,
  removeMember,

};
