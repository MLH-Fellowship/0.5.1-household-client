const getAuthToken = () => window.localStorage.getItem("token");

const getAuthHeaders = () => {
  return {
    Authorization: getAuthToken(),
  };
};

module.exports = {
  getAuthHeaders,
  getAuthToken,
};
