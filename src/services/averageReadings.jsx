import axios from "axios";
const baseUrl = "http://localhost:3001/api/values";

const getAll = (node, variable) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
