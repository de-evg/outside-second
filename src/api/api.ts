import axios from "axios";

const BACKEND_URL = `https://recruting-test-api.herokuapp.com/api/v1/`;
const REQUST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500
};

const createAPI = (onBadRequest: () => void) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUST_TIMEOUT,
    withCredentials: false
  });

  const onSuccess = (response: any) => response;

  const onFail = (err: { response: any; }) => {
    const {response} = err;

    if (response.status === HttpCode.BAD_REQUEST) {
      onBadRequest();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createAPI};
