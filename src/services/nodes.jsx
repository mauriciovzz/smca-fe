import axios from 'axios';

const baseUrl = '/api/spaces';

const create = async (spaceId, newNode) => {
  const request = await axios.post(`${baseUrl}/${spaceId}/nodes`, newNode);
  return request.data;
};

const getSpaceNodes = async (spaceId) => {
  const request = await axios.get(`${baseUrl}/${spaceId}/nodes`);
  return request.data;
};

const getComponents = async (spaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/${spaceId}/nodes/${nodeId}/components`);
  return request.data;
};

const getConfigFile = async (spaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/${spaceId}/nodes/${nodeId}/config-file`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'arraybuffer',
  });

  return request;
};

const updateInfo = async (spaceId, nodeId, newData) => {
  const request = await axios.put(`${baseUrl}/${spaceId}/nodes/${nodeId}`, newData);
  return request.data;
};

const updateLocation = async (spaceId, nodeId, newLocation) => {
  const request = await axios.put(`${baseUrl}/${spaceId}/nodes/${nodeId}/location`, newLocation);
  return request.data;
};

const remove = async (spaceId, nodeId) => {
  const request = await axios.delete(`${baseUrl}/${spaceId}/nodes/${nodeId}`);
  return request.data;
};

export default {
  create,
  getSpaceNodes,
  getComponents,
  getConfigFile,
  updateInfo,
  updateLocation,
  remove,
};
