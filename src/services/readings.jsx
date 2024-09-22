import axios from 'axios';

const baseUrl = '/api/readings';

const getPublicNodeReadings = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getPublicNodeReadings/${nodeId}/${locationId}/${date}`);
  return request.data;
};

const getPrivateNodeReadings = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getPrivateNodeReadings/${nodeId}/${locationId}/${date}`);
  return request.data;
};

export default {
  getPublicNodeReadings,
  getPrivateNodeReadings,
};
