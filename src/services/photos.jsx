import axios from 'axios';

const baseUrl = '/api/photos';

const getDayPaths = async (selectedNode, photoDate) => {
  const request = await axios.get(`${baseUrl}/${selectedNode.node_type}/${selectedNode.node_id}/${selectedNode.lat}/${selectedNode.long}/${photoDate}`);
  return request.data;
};

export default {
  getDayPaths,
};
