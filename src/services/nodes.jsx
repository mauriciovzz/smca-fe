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

const getComponents = async (workspaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}/${nodeId}`);
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
  getComponents,
  create,
  updateName,
  updateState,
  updateType,
  updateVisibility,
  updateLocation,
  updateComponents,
  remove,
};
