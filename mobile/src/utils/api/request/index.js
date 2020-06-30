import axios from 'axios';
import {UserTokenUtil, UserUtils} from '../../services';
import {
  isLoginOrRegister,
  checkUser,
  checkToken,
  getBearerToken,
} from '../../helpers';
import config from 'react-native-config';
/**
 * set axios base configurations
 */
const axiosInst = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 10000,
});

/**
 * interceptor for request
 * requests can directly use token from here rather than passing it everytime
 */
axiosInst.interceptors.request.use(
  async (requestConfig) => {
    if (!isLoginOrRegister(requestConfig.url)) {
      requestConfig.headers.Authorization = getBearerToken(
        await new UserTokenUtil().getUserToken(),
      );
    }
    return requestConfig;
  },
  (error) => Promise.reject(error),
);

/**
 * interceptor for response
 * response can directly fill User service and User token
 */
axiosInst.interceptors.response.use(
  async (response) => {
    const token = checkToken(response);
    const user = checkUser(response);
    token && (await new UserTokenUtil().saveUserToken(token));
    user && new UserUtils().saveUser(user);
    return response;
  },
  (error) => Promise.reject(error),
);

export default axiosInst;
