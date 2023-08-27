import axios from 'axios';

const baseUrl = '/api/average_readings';

const getAll = (nodeLocation, variable, date) => {
  const request = axios.get(`${baseUrl}/${nodeLocation.node_type}/${nodeLocation.node_id}/${variable.variable_id}/${date}`);
  return request.then((response) =>
    response.data);
};

export default { getAll };
