import axios from 'axios';

const baseUrl = '/api/spaces';

const create = async (spaceId, newComponent) => {
  const request = await axios.post(`${baseUrl}/${spaceId}/components`, newComponent);
  return request.data;
};

const getAll = async (spaceId) => {
  const request = await axios.get(`${baseUrl}/${spaceId}/components`);
  return request.data;
};

const update = async (spaceId, componentId, newData) => {
  const request = await axios.put(`${baseUrl}/${spaceId}/components/${componentId}`, newData);
  return request.data;
};

const remove = async (spaceId, componentId) => {
  const request = await axios.delete(`${baseUrl}/${spaceId}/components/${componentId}`);
  return request.data;
};

export default {
  create,
  getAll,
  update,
  remove,
};
