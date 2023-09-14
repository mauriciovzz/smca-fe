import axios from 'axios';

const baseUrl = '/api/locations';

const getLocation = async (node) => {
  const request = await axios.get(`${baseUrl}/${node.lat}/${node.long}`);
  return request.data[0];
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getAll, getLocation };
