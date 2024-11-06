import axios from 'axios';

const baseUrl = '/api/spaces';

const create = async (spaceId, newVariable) => {
  const request = await axios.post(`${baseUrl}/${spaceId}/variables`, newVariable);
  return request.data;
};

const getAll = async (spaceId) => {
  const request = await axios.get(`${baseUrl}/${spaceId}/variables`);
  return request.data;
};

const update = async (spaceId, variableId, newData) => {
  const request = await axios.put(`${baseUrl}/${spaceId}/variables/${variableId}`, newData);
  return request.data;
};

const remove = async (spaceId, variableId) => {
  const request = await axios.delete(`${baseUrl}/${spaceId}/variables/${variableId}`);
  return request.data;
};

export default {
  create,
  getAll,
  update,
  remove,
};
