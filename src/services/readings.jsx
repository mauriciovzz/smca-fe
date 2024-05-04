import axios from 'axios';

const baseUrl = '/api/readings';

const getUiInfo = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getUiInfo/${nodeId}/${locationId}/${date}`);
  return request.data;
};

const getPublicNodeReadings = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getPublicNodeReadings/${nodeId}/${locationId}/${date}`);
  return request.data;
};

const getPrivateNodeReadings = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getPrivateNodeReadings/${nodeId}/${locationId}/${date}`);
  return request.data;
};

export default {
  getUiInfo,
  getPublicNodeReadings,
  getPrivateNodeReadings,
};
