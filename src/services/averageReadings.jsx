import axios from 'axios';

const baseUrl = '/api/average_readings';

const getAll = async (nodeLocation, variable, date) => {
  const request = await axios.get(`${baseUrl}/${nodeLocation.node_type}/${nodeLocation.node_id}/${variable.variable_id}/${date}`);
  return request.data;
};

export default { getAll };
