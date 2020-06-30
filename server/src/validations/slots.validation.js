const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createSlot = {
  body: Joi.object().keys({
    sellerId: Joi.string().custom(objectId).required(),
    fromTime: Joi.date().required(),
    toTime: Joi.date().required(),
    duration: Joi.number().required(),
  }),
};

const getSlots = {
  query: Joi.object().keys({
    sellerId: Joi.string().custom(objectId),
    fromDate: Joi.date().required(),
    toDate: Joi.date().required(),
    isBooked: Joi.bool(),
  }),
};

module.exports = {
  createSlot,
  getSlots,
};
