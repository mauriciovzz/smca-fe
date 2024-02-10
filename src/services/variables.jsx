import axios from 'axios';

const baseUrl = '/api/variables';

const getAll = async () => {
  const request = await axios.get(`${baseUrl}`);
  return request.data;
};

const create = async (newVariable) => {
  const request = await axios.post(baseUrl, newVariable);
  return request.data;
};

const update = async (updatedVariable) => {
  const request = await axios.put(baseUrl, updatedVariable);
  return request.data;
};

const remove = async (variableId) => {
  const request = await axios.delete(`${baseUrl}/${variableId}`);
  return request.data;
};

export default {
  getAll,
  create,
  update,
  remove,
};
