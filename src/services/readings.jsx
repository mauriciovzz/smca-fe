import axios from 'axios';

const baseUrl = '/api/readings';

const getPublicNodeReadings = async (nodeId, date) => {
  const request = await axios.get(`${baseUrl}/getPublicNodeReadings/${nodeId}/${date}`);
  return request.data;
};

const getPrivateNodeReadings = async (nodeId, date) => {
  const request = await axios.get(`${baseUrl}/getPrivateNodeReadings/${nodeId}/${date}`);
  return request.data;
};

export default {
  getPublicNodeReadings,
  getPrivateNodeReadings,
};
