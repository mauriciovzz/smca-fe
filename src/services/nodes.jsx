import axios from 'axios';

const baseUrl = '/api/nodes';

const getTypes = async () => {
  const request = await axios.get(`${baseUrl}/getTypes`);
  return request.data;
};

const getStates = async () => {
  const request = await axios.get(`${baseUrl}/getStates`);
  return request.data;
};

const getAll = async (workspaceId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}`);
  return request.data;
};

const getComponents = async (workspaceId, nodeId) => {
  const request = await axios.get(`${baseUrl}/${workspaceId}/${nodeId}`);
  return request.data;
};

const create = async (workspaceId, newNode) => {
  const request = await axios.post(`${baseUrl}/${workspaceId}`, newNode);
  return request.data;
};

const update = async (workspaceid, locationId, newData) => {
  const request = await axios.put(`${baseUrl}/${workspaceid}/${locationId}`, newData);
  return request.data;
};

const remove = async (workspaceid, locationId) => {
  const request = await axios.delete(`${baseUrl}/${workspaceid}/${locationId}`);
  return request.data;
};

// const getActiveNodes = async () => {
//   const request = await axios.get(`${baseUrl}/active`);
//   return request.data;
// };

// const getAllNodes = async () => {
//   const request = await axios.get(`${baseUrl}/all`);
//   return request.data;
// };

// const getReadingAverages = async (node, date, variableType) => {
//   const request = await axios.get(`${baseUrl}/${node.node_type}/
// ${node.node_id}/${node.lat}/${node.long}/${date}/${variableType}`);
//   return request.data;
// };

// const getAveragesRange = async (node, date, variableType) => {
//   const request = await axios.get(`${baseUrl}/${node.node_type}/${node.node_id}
// /${node.lat}/${ node.long } /${date}/${ variableType } /range`);
//   return request.data;
// };

export default {
  getTypes,
  getStates,
  getAll,
  getComponents,
  create,
  remove,
  update,

  // getActiveNodes,
  // getAllNodes,
  // getReadingAverages,
  // getAveragesRange,
};
