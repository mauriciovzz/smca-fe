import axios from 'axios';

const baseUrl = '/api/nodes';

const getVariables = (nodeLocation) => {
  const request = axios.get(
    `${baseUrl}/${nodeLocation.node_type}/${nodeLocation.node_id}/variables`,
  );
  return request.then((response) =>
    response.data);
};

export default { getVariables };
