import axios from 'axios';

const baseUrl = '/api/components';

const getAll = async () => {
  const request = await axios.get(`${baseUrl}`);
  return request.data;
};

const create = async (newComponent) => {
  const request = await axios.post(baseUrl, newComponent);
  return request.data;
};

const update = async (updatedComponent) => {
  const request = await axios.put(baseUrl, updatedComponent);
  return request.data;
};

const remove = async (componentType, componentId) => {
  const request = await axios.delete(`${baseUrl}/${componentType}/${componentId}`);
  return request.data;
};

export default {
  getAll,
  create,
  update,
  remove,
};
