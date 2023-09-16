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

export default { getAll, getOne, create };
