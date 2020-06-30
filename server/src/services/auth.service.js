const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Login with username
 * @param {string} email
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndRole = async (email, role) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist!');
  }
  if (!userService.verifyRole(user, role)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong role');
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndRole,
};
