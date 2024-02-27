import axios from 'axios';

const baseUrl = '/api/workspaces';

const create = async (newWorkspace) => {
  const response = await axios.post(baseUrl, newWorkspace);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getMembers = async (workspaceId) => {
  const response = await axios.get(`${baseUrl}/members/${workspaceId}`);
  return response.data;
};

const getInvitations = async () => {
  const response = await axios.get(`${baseUrl}/invitations`);
  return response.data;
};

const invitationCreation = async (invitationInfo) => {
  const response = await axios.post(`${baseUrl}/invitationCreation`, invitationInfo);
  return response.data;
};

const invitationResponse = async (invitationInfo) => {
  const response = await axios.post(`${baseUrl}/invitationResponse`, invitationInfo);
  return response.data;
};

const memberRoleUpdate = async (memberInfo) => {
  const response = await axios.put(`${baseUrl}/memberRoleUpdate`, memberInfo);
  return response.data;
};

const memberRemoval = async (workspaceId, accountId) => {
  const response = await axios.delete(`${baseUrl}/memberRemoval/${workspaceId}/${accountId}`);
  return response.data;
};

const updateName = async (newName) => {
  const response = await axios.put(`${baseUrl}/updateName`, newName);
  return response.data;
};

const updateColor = async (newColor) => {
  const response = await axios.put(`${baseUrl}/updateColor`, newColor);
  return response.data;
};

const leaveWorkspace = async (workspaceId) => {
  const response = await axios.delete(`${baseUrl}/leaveWorkspace/${workspaceId}`);
  return response.data;
};

const deleteWorkspace = async (workspaceId) => {
  const response = await axios.delete(`${baseUrl}/deleteWorkspace/${workspaceId}`);
  return response.data;
};

export default {
  create,
  getAll,
  getMembers,
  getInvitations,
  invitationCreation,
  invitationResponse,
  memberRoleUpdate,
  memberRemoval,
  updateName,
  updateColor,
  leaveWorkspace,
  deleteWorkspace,
};
