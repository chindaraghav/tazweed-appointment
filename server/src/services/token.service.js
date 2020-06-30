const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessToken = generateToken(user.id);

  return {
    access: {
      token: accessToken,
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */

module.exports = {
  generateToken,
  generateAuthTokens,
};
