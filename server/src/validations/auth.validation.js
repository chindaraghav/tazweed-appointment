const Joi = require('@hapi/joi');
const { roles } = require('../config/roles');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    role: Joi.any()
      .required()
      .valid(...roles),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    role: Joi.any()
      .required()
      .valid(...roles),
  }),
};

module.exports = {
  register,
  login,
};
