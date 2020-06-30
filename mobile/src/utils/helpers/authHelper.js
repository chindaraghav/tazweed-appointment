import get from 'lodash/get';

const API_URL = ['login', 'register'];

const isLoginOrRegister = (apiUrl) =>
  API_URL.findIndex((url) => apiUrl.includes(url)) >= 0;

const checkToken = (response) => {
  const apiUrl = get(response, 'config.url');
  const token =
    isLoginOrRegister(apiUrl) &&
    get(response, 'data.tokens.access.token', false);
  return token;
};

const checkUser = (response) => {
  const apiUrl = get(response, 'config.url');
  const user = isLoginOrRegister(apiUrl) && get(response, 'data.user', false);
  return user;
};

const getBearerToken = (token) => {
  return `Bearer ${token}`;
};

export {checkToken, checkUser, isLoginOrRegister, getBearerToken};
