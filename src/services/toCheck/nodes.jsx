import axios from 'axios';

const baseUrl = '/api/nodes';

const getTypes = async () => {
  const request = await axios.get(`${baseUrl}/getTypes`);
  return request.data;
};

const getStates = async () => {
  const request = await axios.get(`${baseUrl}/getStates`);
  return request.data;
};

const getAll = async (workspaceId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}`);
  return request.data;
};

const getPublicNodes = async () => {
  const request = await axios.get(`${baseUrl}/publicNodes`);
  return request.data;
};

const getAccountNodes = async () => {
  const request = await axios.get(`${baseUrl}/accountNodes`);
  return request.data;
};

const getWorkspaceNodes = async (workspaceId) => {
  const request = await axios.get(`${baseUrl}/workspaceNodes/${workspaceId}`);
  return request.data;
};

const getPrivateNodeComponents = async (workspaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/privateNodeComponents/${workspaceId}/${nodeId}`);
  return request.data;
};

const getPublicNodeComponents = async (workspaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/publicNodeComponents/${workspaceId}/${nodeId}`);
  return request.data;
};

const getConfigFile = async (workspaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/getConfigFile/${workspaceId}/${nodeId}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'arraybuffer',
  });

  return request.data;
};

const create = async (workspaceId, newNode) => {
  const request = await axios.post(`${baseUrl}/${workspaceId}`, newNode);
  return request.data;
};

const updateName = async (workspaceid, nodeId, newName) => {
  const request = await axios.put(`${baseUrl}/updateName/${workspaceid}/${nodeId}`, newName);
  return request.data;
};

const updateState = async (workspaceid, nodeId, stateId) => {
  const request = await axios.put(`${baseUrl}/updateState/${workspaceid}/${nodeId}`, stateId);
  return request.data;
};

const updateType = async (workspaceid, nodeId, typeId) => {
  const request = await axios.put(`${baseUrl}/updateType/${workspaceid}/${nodeId}`, typeId);
  return request.data;
};

const updateVisibility = async (workspaceid, nodeId, newVisibility) => {
  const request = await axios.put(`${baseUrl}/updateVisibility/${workspaceid}/${nodeId}`, newVisibility);
  return request.data;
};

const updateLocation = async (workspaceid, nodeId, newLocation) => {
  const request = await axios.put(`${baseUrl}/updateLocation/${workspaceid}/${nodeId}`, newLocation);
  return request.data;
};

const updateComponents = async (workspaceid, nodeId, updatedComponents) => {
  const request = await axios.put(`${baseUrl}/updateComponents/${workspaceid}/${nodeId}`, updatedComponents);
  return request.data;
};

const remove = async (workspaceid, nodeId) => {
  const request = await axios.delete(`${baseUrl}/${workspaceid}/${nodeId}`);
  return request.data;
};

export default {
  getTypes,
  getStates,
  getAll,
  getPublicNodes,
  getAccountNodes,
  getWorkspaceNodes,
  getPrivateNodeComponents,
  getPublicNodeComponents,
  getConfigFile,
  create,
  updateName,
  updateState,
  updateType,
  updateVisibility,
  updateLocation,
  updateComponents,
  remove,
};
