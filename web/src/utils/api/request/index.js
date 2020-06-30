import axios from "axios";
import { UserTokenUtil, UserUtils } from "../../services";
import { isLoginOrRegister, checkUser, checkToken, getBearerToken } from "../../helpers";

/**
 * set axios base configurations
 */
const axiosInst = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
});

/**
 * interceptor for request
 * requests can directly use token from here rather than passing it everytime
 */
axiosInst.interceptors.request.use(
  (requestConfig) => {
    if (!isLoginOrRegister(requestConfig.url)) {
      requestConfig.headers.Authorization = getBearerToken(new UserTokenUtil().getUserToken());
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

/**
 * interceptor for response
 * response can directly fill User service and User token
 */
axiosInst.interceptors.response.use(
  (response) => {
    const token = checkToken(response);
    const user = checkUser(response);
    token && new UserTokenUtil().saveUserToken(token);
    user && new UserUtils().saveUser(user);
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInst;
