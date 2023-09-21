const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedSmcaUser'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export default authHeader;
