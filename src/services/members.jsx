import axios from 'axios';

const baseUrl = '/api/spaces';

const getMembers = async (spaceId) => {
  const response = await axios.get(`${baseUrl}/${spaceId}/members`);
  return response.data;
};

const updateMemberRole = async (spaceId, accountId) => {
  const response = await axios.put(`${baseUrl}/${spaceId}/members/${accountId}`);
  return response.data;
};

const leaveSpace = async (spaceId, accountId) => {
  const response = await axios.delete(`${baseUrl}/${spaceId}/members/${accountId}/leave`);
  return response.data;
};

const removeMember = async (spaceId, accountId) => {
  const response = await axios.delete(`${baseUrl}/${spaceId}/members/${accountId}/remove`);
  return response.data;
};

export default {
  getMembers,
  updateMemberRole,
  leaveSpace,
  removeMember,
};
