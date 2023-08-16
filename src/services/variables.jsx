import axios from "axios";
const baseUrl = "http://localhost:3001/api/variables";

const getAll = (node) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
