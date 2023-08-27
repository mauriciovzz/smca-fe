import axios from 'axios';

const baseUrl = '/api/variables';

const getAll = (nodeLocation) => {
  const request = axios.get(`${baseUrl}/${nodeLocation.node_type}/${nodeLocation.node_id}`);
  return request.then((response) =>
    response.data);
};

export default { getAll };
