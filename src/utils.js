const getAuthToken = () => window.localStorage.getItem("token");

const setAuthToken = (token) => window.localStorage.setItem("token", token);

const removeAuthToken = () => window.localStorage.removeItem("token");

const setAuthUser = (username) => {
  window.localStorage.setItem("username", username);
};
const getUserName = () => window.localStorage.getItem("username", "User");
const removeAuthUser = () => {
  window.localStorage.removeItem("username");
};
const getAuthHeaders = () => {
  return {
    Authorization: getAuthToken(),
  };
};

module.exports = {
  getAuthHeaders,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  setAuthUser,
  removeAuthUser,
  getUserName,
};
