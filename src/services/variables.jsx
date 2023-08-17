import axios from "axios";
const baseUrl = "/api/variables";

const getAll = (node) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
