import axios from 'axios';

const baseUrl = '/api/spaces';

const create = async (spaceId, newLocation) => {
  const request = await axios.post(`${baseUrl}/${spaceId}/locations`, newLocation);
  return request.data;
};

const getAll = async (spaceId) => {
  const request = await axios.get(`${baseUrl}/${spaceId}/locations`);
  return request.data;
};

const update = async (spaceId, locationId, newData) => {
  const request = await axios.put(`${baseUrl}/${spaceId}/locations/${locationId}`, newData);
  return request.data;
};

const updateVisibility = async (spaceId, locationId) => {
  const request = await axios.put(`${baseUrl}/${spaceId}/locations/${locationId}/visibility`);
  return request.data;
};

const remove = async (spaceId, locationId) => {
  const request = await axios.delete(`${baseUrl}/${spaceId}/locations/${locationId}`);
  return request.data;
};

export default {
  create,
  getAll,
  update,
  updateVisibility,
  remove,
};
