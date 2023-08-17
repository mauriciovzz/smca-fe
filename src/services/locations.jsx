import axios from "axios";
const baseUrl = "/api/locations";

const getLocation = (node) => {
  const request = axios.get(`${baseUrl}/${node.type}/${node.id}`);
  return request.then((response) => response.data);
};

export default { getLocation };
