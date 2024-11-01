import axios from 'axios';

const baseUrl = '/api/components';

const getTypes = async () => {
  const request = await axios.get(`${baseUrl}/getTypes`);
  return request.data;
};

const getAll = async (workspaceId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}`);
  return request.data;
};

const create = async (workspaceId, newComponent) => {
  const request = await axios.post(`${baseUrl}/${workspaceId}`, newComponent);
  return request.data;
};

const update = async (workspaceid, componentId, newData) => {
  const request = await axios.put(`${baseUrl}/${workspaceid}/${componentId}`, newData);
  return request.data;
};

const remove = async (workspaceid, componentId) => {
  const request = await axios.delete(`${baseUrl}/${workspaceid}/${componentId}`);
  return request.data;
};

export default {
  getAll,
  getTypes,
  create,
  update,
  remove,
};
