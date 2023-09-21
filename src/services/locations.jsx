import axios from 'axios';
import authHeader from '../utils/authHeader';

const baseUrl = '/api/locations';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getOne = async (node) => {
  const request = await axios.get(`${baseUrl}/${node.lat}/${node.long}`);
  return request.data[0];
};

const create = async (locationInfo) => {
  const request = await axios.post(baseUrl, locationInfo, {
    headers: authHeader(),
  });
  return request.data;
};

const update = async (updatedLocation) => {
  const request = await axios.put(baseUrl, updatedLocation, {
    headers: authHeader(),
  });
  return request.data;
};

const remove = async (location) => {
  const request = await axios.delete(`${baseUrl}/${location.lat}/${location.long}`, {
    headers: authHeader(),
  });
  return request.data;
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
