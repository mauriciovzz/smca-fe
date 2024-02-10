import axios from 'axios';

const baseUrl = '/api//workspaces';

const create = async (newWorkspace) => {
  const response = await axios.post(`${baseUrl}`, newWorkspace);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

export default {
  create,
  getAll,
};
