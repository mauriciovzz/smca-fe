import axios from 'axios';

const baseUrl = '/api/nodes';

const getActiveNodes = async () => {
  const request = await axios.get(`${baseUrl}/active`);
  return request.data;
};

const getAllNodes = async () => {
  const request = await axios.get(`${baseUrl}/all`);
  return request.data;
};

const getReadingAverages = async (node, date, variableType) => {
  const request = await axios.get(`${baseUrl}/${node.node_type}/${node.node_id}/${node.lat}/${node.long}/${date}/${variableType}`);
  return request.data;
};

const getAveragesRange = async (node, date, variableType) => {
  const request = await axios.get(`${baseUrl}/${node.node_type}/${node.node_id}/${node.lat}/${node.long}/${date}/${variableType}/range`);
  return request.data;
};

export default {
  getActiveNodes,
  getAllNodes,
  getReadingAverages,
  getAveragesRange,
};
