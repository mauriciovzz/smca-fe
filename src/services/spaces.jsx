import axios from 'axios';

const baseUrl = '/api/spaces';

const create = async (newSpaceData) => {
  const response = await axios.post(baseUrl, newSpaceData);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (spaceId) => {
  const response = await axios.get(`${baseUrl}/${spaceId}`);
  return response.data;
};

const updateName = async (spaceId, newName) => {
  const response = await axios.put(`${baseUrl}/${spaceId}/update-name`, newName);
  return response.data;
};

const updateColor = async (spaceId, newColor) => {
  const response = await axios.put(`${baseUrl}/${spaceId}/update-color`, newColor);
  return response.data;
};

const remove = async (spaceId) => {
  const response = await axios.delete(`${baseUrl}/${spaceId}`);
  return response.data;
};

export default {
  create,
  getAll,
  getOne,
  updateName,
  updateColor,
  remove,
};
