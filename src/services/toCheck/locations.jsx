import axios from 'axios';

const baseUrl = '/api/locations';

const getAll = async (workspaceId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}`);
  return request.data;
};

const create = async (workspaceId, newLocation) => {
  const request = await axios.post(`${baseUrl}/${workspaceId}`, newLocation);
  return request.data;
};

const update = async (workspaceid, variableId, newData) => {
  const request = await axios.put(`${baseUrl}/${workspaceid}/${variableId}`, newData);
  return request.data;
};

const remove = async (workspaceid, variableId) => {
  const request = await axios.delete(`${baseUrl}/${workspaceid}/${variableId}`);
  return request.data;
};

// hey

// const getFree = async () => {
//   const request = await axios.get(`${baseUrl}/free`);
//   return request.data;
// };

// const getOne = async (node) => {
//   const request = await axios.get(`${baseUrl}/${node.lat}/${node.long}`);
//   return request.data[0];
// };

export default {
  getAll,
  create,
  update,
  remove,

  // getFree,
  // getOne,
};
