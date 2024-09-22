import axios from 'axios';

const baseUrl = '/api/photos';

const getPublicNodePhotos = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getPublicNodePhotos/${nodeId}/${locationId}/${date}`);
  return request.data;
};

const getPrivateNodePhotos = async (nodeId, locationId, date) => {
  const request = await axios.get(`${baseUrl}/getPrivateNodePhotos/${nodeId}/${locationId}/${date}`);
  return request.data;
};

export default {
  getPublicNodePhotos,
  getPrivateNodePhotos,
};
