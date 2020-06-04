import axios from "axios";

const responseInterceptor = (response) => ({
  data: response.data,
  status: response.status,
  success: true,
});

const errorInterceptor = (errorObject) => {
  const errorMessage = errorObject.message;

  const status = errorObject.response ? errorObject.response.status : 500;
  const data = errorObject.response
    ? errorObject.response.data
    : { message: "Something went wrong." };
  const errorResponse = { data, success: false, status };
  let message = "Something went wrong";
  if (errorMessage.includes("timeout")) {
    message = "Request Timeout. Please try again later";
  } else if (status === 404) {
    message = "Not found";
  } else if (status === 401) {
    message = "Unauthorized";
  } else if (status === 403) {
    message = "Invalid Credentials.";
  } else if (status === 400) {
    message = "Bad request.";
  }

  return {
    message,
    ...errorResponse,
  };
};

class HTTPClient {
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      timeout: process.env.HTTP_TIMEOUT || 30000,
      headers,
    });
    this.instance.interceptors.response.use(
      responseInterceptor,
      errorInterceptor
    );
  }

  async get(endpoint) {
    const { instance } = this;
    const response = await instance.get(endpoint);
    return response;
  }

  async post(endpoint, payload) {
    const { instance } = this;
    const response = await instance.post(endpoint, payload);
    return response;
  }

  async put(endpoint, payload) {
    const { instance } = this;
    const response = await instance.put(endpoint, payload);
    return response;
  }

  async delete(endpoint) {
    const { instance } = this;
    const response = await instance.delete(endpoint);
    return response;
  }
}

export default HTTPClient;
