import axios from 'axios';

const baseUrl = '/api/nodes';

const getVariables = async (nodeLocation) => {
  const request = await axios.get(`${baseUrl}/${nodeLocation.node_type}/${nodeLocation.node_id}/variables`);
  return request.data;
};

export default { getVariables };
