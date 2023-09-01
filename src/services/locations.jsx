import axios from 'axios';

const baseUrl = '/api/locations';

const getLocation = (node) => {
  const request = axios.get(`${baseUrl}/${node.lat}/${node.long}`);
  return request.then((response) =>
    response.data[0]);
};

export default { getLocation };
