const httpStatus = require('http-status');
const { get } = require('lodash');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const searchUsers = async (filter) => {
  const searchString = get(filter, 'name');
  const role = get(filter, 'role');
  const users = await User.find({ $and: [{ name: { $regex: searchString, $options: 'i' } }, { role }] });
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {User} user
 * @param {string} role
 * @returns {Boolean}
 */
const verifyRole = (user, role) => {
  return user.role === role;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  searchUsers,
  verifyRole,
};
