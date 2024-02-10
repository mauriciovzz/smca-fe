import axios from 'axios';

const baseUrl = '/api/locations';

const getFree = async () => {
  const request = await axios.get(`${baseUrl}/free`);
  return request.data;
};

const getOne = async (node) => {
  const request = await axios.get(`${baseUrl}/${node.lat}/${node.long}`);
  return request.data[0];
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (locationInfo) => {
  const request = await axios.post(baseUrl, locationInfo);
  return request.data;
};

const update = async (updatedLocation) => {
  const request = await axios.put(baseUrl, updatedLocation);
  return request.data;
};

const remove = async (location) => {
  const request = await axios.delete(`${baseUrl}/${location.lat}/${location.long}`);
  return request.data;
};

export default {
  getFree,
  getAll,
  getOne,
  create,
  update,
  remove,
};
