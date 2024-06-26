import axios from 'axios';

const baseUrl = '/api/variables';

const getTypes = async () => {
  const request = await axios.get(`${baseUrl}/getTypes`);
  return request.data;
};

const getValueTypes = async () => {
  const request = await axios.get(`${baseUrl}/getValueTypes`);
  return request.data;
};

const getAll = async (workspaceId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}`);
  return request.data;
};

const create = async (workspaceId, newVariable) => {
  const request = await axios.post(`${baseUrl}/${workspaceId}`, newVariable);
  return request.data;
};

const update = async (workspaceid, variableId, newData) => {
  const request = await axios.put(`${baseUrl}/${workspaceid}/${variableId}`, newData);
  return request.data;
};

const remove = async (workspaceid, variableId) => {
  const request = await axios.delete(`${baseUrl}/${workspaceid}/${variableId}`);
  return request.data;
};

export default {
  getTypes,
  getValueTypes,
  getAll,
  create,
  update,
  remove,
};
