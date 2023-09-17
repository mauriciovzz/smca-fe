import axios from 'axios';

const baseUrl = '/api/locations';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getOne = async (node) => {
  const request = await axios.get(`${baseUrl}/${node.lat}/${node.long}`);
  return request.data[0];
};

const create = async (user, locationInfo) => {
  const request = await axios.post(baseUrl, locationInfo, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
  return request.data;
};

const update = async (user, updatedLocation) => {
  const request = await axios.put(baseUrl, updatedLocation, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
  return request.data;
};

const remove = async (user, location) => {
  const request = await axios.delete(`${baseUrl}/${location.lat}/${location.long}`, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
  return request.data;
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove
};
